import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Linking, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { setupDatabase, seedContacts, cacheRiskSnapshot, getLatestRiskSnapshot, logCheck } from './database';
import { fetchAlerts, calculateRisk } from './weather';
import { getCurrentTown, MORRIS_COUNTY_CONTACTS, MORRIS_COUNTY_OEM, getSelectedTown } from './location';
import { requestNotificationPermission, sendRiskNotification } from './notifications';
import { getTreeCompaniesForTown } from './treeCompanies';
import { getMunicipalUtilitiesForTown } from './municipalUtilities';
import { globalStyles, colors } from './styles';
import { generateEmergencyPack } from './pdfExport';

export default function DirectoryScreen({ navigation }) {
  const [contacts, setContacts] = useState([]);
  const [risk, setRisk] = useState(null);
  const [detectedTown, setDetectedTown] = useState(null);
  const [manualTown, setManualTown] = useState(null);

  useEffect(() => {
    async function load() {
      const db = await setupDatabase();
      await seedContacts(db);
      await requestNotificationPermission();

      const allContacts = await db.getAllAsync('SELECT * FROM contacts');
      setContacts(allContacts);

      const town = await getCurrentTown();
      console.log('Detected town:', town);
      setDetectedTown(town);

      try {
        const alerts = await fetchAlerts();
        const riskResult = calculateRisk(alerts);
        setRisk(riskResult);

        await logCheck(db, riskResult.tier, riskResult.score, 'foreground');

        if (riskResult.tier !== 'low') {
          await cacheRiskSnapshot(db, riskResult.score, riskResult.tier);
          await sendRiskNotification(riskResult.tier, riskResult.score);
        }
      } catch (err) {
        console.log('Live fetch failed, falling back to cached snapshot:', err);
        const cached = await getLatestRiskSnapshot(db);
        if (cached) {
          setRisk({ score: cached.score, tier: cached.tier, cached: true, breakdown: [] });
        }
      }
    }
    load();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const stored = getSelectedTown();
      if (stored) {
        setManualTown(stored);
      }
    }, [])
  );

  const effectiveTown = manualTown || detectedTown || 'Randolph';

  const utilities = [
    ...contacts.filter((c) => c.category === 'utility'),
    ...getMunicipalUtilitiesForTown(effectiveTown),
  ];

  const localContacts = [
    ...(MORRIS_COUNTY_CONTACTS[effectiveTown] || MORRIS_COUNTY_CONTACTS['Randolph']),
    MORRIS_COUNTY_OEM,
  ];
  const treeCompanies = getTreeCompaniesForTown(effectiveTown);

  const bannerColors = {
    low: colors.low,
    moderate: colors.moderate,
    high: colors.high,
  };

  return (
    <SafeAreaView style={globalStyles.screenContainer} edges={['bottom']}>
      <ScrollView contentContainerStyle={globalStyles.screenContent}>
        {risk && (
          <TouchableOpacity
            style={[globalStyles.riskBanner, { backgroundColor: bannerColors[risk.tier] }]}
            onPress={() => navigation.navigate('RiskDetail', { risk, townName: effectiveTown })}
          >
            <Text style={globalStyles.riskBannerText}>
              {effectiveTown} Outage Risk: {risk.tier.toUpperCase()} ({risk.score}/100)
              {risk.cached ? ' — showing last known data (offline)' : ''}
            </Text>
            <Text style={{ color: 'white', fontSize: 11, textAlign: 'center', marginTop: 4, opacity: 0.85 }}>
              Tap to see why
            </Text>
          </TouchableOpacity>
        )}

        {!detectedTown && !manualTown && (
          <View style={{ backgroundColor: '#fff3cd', padding: 12, borderRadius: 8, marginBottom: 12 }}>
            <Text style={{ color: colors.text, fontSize: 13 }}>
              We couldn't detect your location. Tap "Change Location" below to select your town manually.
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={[globalStyles.actionButton, { backgroundColor: colors.triageButton }]}
          onPress={() => navigation.navigate('Triage')}
        >
          <Text style={globalStyles.actionButtonText}>Medical Emergency? Tap Here</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[globalStyles.actionButton, { backgroundColor: colors.treeButton }]}
          onPress={() => navigation.navigate('TreeCompany')}
        >
          <Text style={globalStyles.actionButtonText}>Downed Tree? Find Removal Help</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[globalStyles.actionButton, { backgroundColor: colors.shelterButton }]}
          onPress={() => navigation.navigate('Shelter')}
        >
          <Text style={globalStyles.actionButtonText}>Find Cooling/Warming Centers</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[globalStyles.actionButton, { backgroundColor: '#5a3e91' }]}
          onPress={() => navigation.navigate('RoadClosures')}
        >
          <Text style={globalStyles.actionButtonText}>Check Road Conditions</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[globalStyles.actionButton, { backgroundColor: colors.brand }]}
          onPress={async () => {
            const uri = await generateEmergencyPack(utilities, localContacts, treeCompanies, effectiveTown);
            navigation.navigate('PdfView', { uri });
          }}
        >
          <Text style={globalStyles.actionButtonText}>Download Emergency Contact Pack</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[globalStyles.actionButton, { backgroundColor: '#8d6e63' }]}
          onPress={() => navigation.navigate('TownSelect')}
        >
          <Text style={globalStyles.actionButtonText}>Change Location ({effectiveTown})</Text>
        </TouchableOpacity>

        <Text style={globalStyles.sectionTitle}>Report an Outage</Text>

        {utilities.map((u, index) => (
          <View key={u.id ?? `municipal-${index}`} style={globalStyles.contactBlock}>
            <Text style={globalStyles.contactName}>{u.name}</Text>
            <TouchableOpacity onPress={() => Linking.openURL(`tel:${u.phone}`)}>
              <Text style={globalStyles.contactPhone}>{u.display}</Text>
            </TouchableOpacity>
            {u.sms && (
              <TouchableOpacity onPress={() => Linking.openURL(`sms:${u.sms}&body=STAT`)}>
                <Text style={globalStyles.smsText}>Click to Text "STAT" to {u.sms}</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}

        <Text style={globalStyles.sectionTitle}>Local Emergency (Non-911)</Text>

        {localContacts.map((c, index) => (
          <View key={index} style={globalStyles.contactBlock}>
            <Text style={globalStyles.contactName}>{c.name}</Text>
            <TouchableOpacity onPress={() => Linking.openURL(`tel:${c.phone}`)}>
              <Text style={globalStyles.contactPhone}>{c.display}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
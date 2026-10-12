import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { setupDatabase, getRecentChecks } from './database';
import { globalStyles, colors } from './styles';

export default function CheckLogScreen() {
  const [checks, setChecks] = useState([]);

  useEffect(() => {
    async function load() {
      const db = await setupDatabase();
      const recent = await getRecentChecks(db, 30);
      setChecks(recent);
    }
    load();
  }, []);

  return (
    <SafeAreaView style={globalStyles.screenContainer} edges={['bottom']}>
      <ScrollView contentContainerStyle={globalStyles.screenContent}>
        <Text style={{ fontSize: 14, color: colors.textSecondary, marginBottom: 12 }}>
          A log of every time the app checked risk, whether from opening the app or a real
          background check while it was closed. Useful for confirming background monitoring
          is actually working.
        </Text>

        {checks.length === 0 && (
          <Text style={{ color: colors.textSecondary }}>No checks logged yet.</Text>
        )}

        {checks.map((c) => (
          <View key={c.id} style={globalStyles.contactBlock}>
            <Text style={globalStyles.contactName}>
              {new Date(c.checked_at).toLocaleString()}
            </Text>
            <Text style={{ color: colors.textSecondary, marginTop: 2 }}>
              {c.source === 'background' ? '🔵 Background check' : '⚪️ App opened'}, risk: {c.tier} ({c.score}/100)
            </Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
import { View, Text, TouchableOpacity, Linking, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';
import { getSheltersForTown } from './shelters';
import { getSelectedTown } from './location';
import { globalStyles, colors } from './styles';

function openInMaps(shelter) {
  const query = encodeURIComponent(shelter.address);
  const url = Platform.select({
    ios: `maps://?q=${query}&ll=${shelter.latitude},${shelter.longitude}`,
    android: `geo:${shelter.latitude},${shelter.longitude}?q=${query}`,
  });
  Linking.openURL(url);
}

export default function ShelterScreen({ route }) {
  const town = getSelectedTown() || route.params?.town || 'Randolph';
  const shelters = getSheltersForTown(town);

  return (
    <SafeAreaView style={globalStyles.screenContainer} edges={['bottom']}>
      <ScrollView contentContainerStyle={globalStyles.screenContent}>
        <Text style={{ fontSize: 16, fontWeight: '600', color: colors.text, marginBottom: 4 }}>
          Cooling/warming locations for {town}
        </Text>
        <Text style={{ fontSize: 13, color: colors.textSecondary, marginBottom: 12 }}>
          Known cooling/warming locations, open during listed hours.
        </Text>

        {shelters.length === 0 && (
          <Text style={{ color: colors.textSecondary, marginTop: 12 }}>
            No verified cooling/warming locations for {town} yet. Call 2-1-1 for local referrals.
          </Text>
        )}

        {shelters.length > 0 && (
          <MapView
            style={{ width: '100%', height: 220, borderRadius: 10, marginBottom: 16 }}
            initialRegion={{
              latitude: shelters[0].latitude,
              longitude: shelters[0].longitude,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
          >
            {shelters.map((s, index) => (
              <Marker
                key={index}
                coordinate={{ latitude: s.latitude, longitude: s.longitude }}
                title={s.name}
                description={s.address}
              />
            ))}
          </MapView>
        )}

        {shelters.map((s, index) => (
          <View key={index} style={globalStyles.contactBlock}>
            <Text style={globalStyles.contactName}>{s.name}</Text>
            <Text style={{ color: colors.textSecondary, marginTop: 2 }}>{s.address}</Text>
            <Text style={{ color: colors.text, marginTop: 2, fontSize: 13 }}>
              Hours: {s.hours}
            </Text>
            <TouchableOpacity onPress={() => openInMaps(s)}>
              <Text style={[globalStyles.contactPhone, { marginTop: 6 }]}>
                Open in Maps →
              </Text>
            </TouchableOpacity>
          </View>
        ))}

        <Text style={{ marginTop: 20, color: colors.textSecondary, fontSize: 13 }}>
          Call 2-1-1, New Jersey's 24/7 emergency hotline, for other towns or if these locations are closed.
        </Text>

        <TouchableOpacity
          style={[globalStyles.actionButton, { backgroundColor: colors.link, marginTop: 16 }]}
          onPress={() => Linking.openURL('tel:211')}
        >
          <Text style={globalStyles.actionButtonText}>Call 2-1-1</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
import { View, Text, TouchableOpacity, Linking, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getTreeCompaniesForTown } from './treeCompanies';
import { getSelectedTown } from './location';
import { globalStyles, colors } from './styles';

export default function TreeCompanyScreen({ navigation, route }) {
  const town = getSelectedTown() || route.params?.town || 'Randolph';
  const companies = getTreeCompaniesForTown(town);

  return (
    <SafeAreaView style={globalStyles.screenContainer} edges={['bottom']}>
      <ScrollView contentContainerStyle={globalStyles.screenContent}>
        <Text style={{ fontSize: 16, fontWeight: '600', color: colors.text, marginBottom: 4 }}>
          Tree companies serving {town}
        </Text>
        <Text style={{ fontSize: 13, color: colors.textSecondary, marginBottom: 12 }}>
          Contact a local tree removal company to help clear downed trees blocking power lines or roads.
        </Text>

        {companies.length === 0 && (
          <Text style={{ color: colors.textSecondary, marginTop: 20 }}>
            No verified tree companies for {town} yet. Try a nearby town, or call 2-1-1 for local referrals.
          </Text>
        )}

        {companies.map((t, index) => (
          <View key={index} style={globalStyles.contactBlock}>
            <Text style={globalStyles.contactName}>{t.name}</Text>
            <TouchableOpacity onPress={() => Linking.openURL(`tel:${t.phone}`)}>
              <Text style={globalStyles.contactPhone}>{t.display}</Text>
            </TouchableOpacity>
            {t.sms && (
              <TouchableOpacity onPress={() => Linking.openURL(`sms:${t.sms}`)}>
                <Text style={globalStyles.smsText}>Click to Text</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
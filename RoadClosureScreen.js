import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { globalStyles, colors } from './styles';

export default function RoadClosureScreen({ navigation }) {
  const mapUrl = 'https://511nj.org/event';

  return (
    <SafeAreaView style={globalStyles.screenContainer} edges={['bottom']}>
      <Text style={{
        fontSize: 14,
        fontWeight: '600',
        color: colors.text,
        backgroundColor: '#fff3cd',
        padding: 12,
        textAlign: 'center',
      }}>
        Select Morris County from the "County" dropdown below to filter to local incidents.
      </Text>
      <WebView source={{ uri: mapUrl }} style={{ flex: 1 }} />
      <TouchableOpacity
        style={[globalStyles.actionButton, { backgroundColor: colors.link, margin: 16 }]}
        onPress={() => Linking.openURL('https://511nj.org/event')}
      >
        <Text style={globalStyles.actionButtonText}>Open Official 511NJ Site</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
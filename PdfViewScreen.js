import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { TouchableOpacity, Text } from 'react-native';
import * as Sharing from 'expo-sharing';
import { globalStyles, colors } from './styles';

export default function PdfViewScreen({ route }) {
    const { uri } = route.params;

    async function handleShare() {
        const canShare = await Sharing.isAvailableAsync();
        if (canShare) {
            await Sharing.shareAsync(uri);
        }
    }

    return (
        <SafeAreaView style={globalStyles.screenContainer} edges={['bottom']}>
            <WebView
                source={{ uri }}
                style={{ flex: 1 }}
                originWhitelist={['*']}
            />
            <TouchableOpacity
                style={[globalStyles.actionButton, { backgroundColor: colors.link, margin: 16 }]}
                onPress={handleShare}
            >
                <Text style={globalStyles.actionButtonText}>Share or Save</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles, colors } from './styles';

export default function RiskDetailScreen({ route }) {
    const { risk, townName } = route.params;

    const bannerColors = {
        low: colors.low,
        moderate: colors.moderate,
        high: colors.high,
    };

    return (
        <SafeAreaView style={globalStyles.screenContainer} edges={['bottom']}>
            <ScrollView contentContainerStyle={globalStyles.screenContent}>
                <View style={[globalStyles.riskBanner, { backgroundColor: bannerColors[risk.tier] }]}>
                    <Text style={globalStyles.riskBannerText}>
                        {townName} Outage Risk: {risk.tier.toUpperCase()} ({risk.score}/100)
                    </Text>
                </View>

                <Text style={globalStyles.sectionTitle}>Why This Score?</Text>

                {risk.breakdown && risk.breakdown.length > 0 ? (
                    risk.breakdown.map((b, index) => (
                        <View key={index} style={globalStyles.contactBlock}>
                            <Text style={globalStyles.contactName}>{b.event}</Text>
                            <Text style={{ color: colors.textSecondary, marginTop: 2 }}>
                                NOAA severity: {b.severity}, contributed {b.points} points
                            </Text>
                        </View>
                    ))
                ) : (
                    <Text style={{ color: colors.textSecondary, marginTop: 8 }}>
                        No active weather alerts were found for this area, so the score defaults to 0.
                    </Text>
                )}

                <Text style={globalStyles.sectionTitle}>How Scoring Works</Text>
                <Text style={{ color: colors.text, fontSize: 14, lineHeight: 20, marginTop: 4 }}>
                    This app checks NOAA's live weather alerts for your area and assigns points based on
                    each alert's official severity level: Extreme alerts are worth 40 points, Severe alerts
                    25, Moderate alerts 10, and Minor alerts 3. Certain storm types, like winter storms,
                    high winds, ice storms, and floods, add bonus points on top of that, since they are more
                    likely to actually cause power outages. The highest-scoring alert determines your final
                    score. A score of 40 or higher is HIGH risk, 10 or higher is MODERATE, and anything
                    below that is LOW.
                </Text>

                <Text style={globalStyles.sectionTitle}>Background Checks</Text>
                <Text style={{ color: colors.text, fontSize: 14, lineHeight: 20, marginTop: 4 }}>
                    For automatic risk checks even when this app is closed, make sure Background App
                    Refresh is on for GridShield NJ (Settings → General → Background App Refresh).
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
}
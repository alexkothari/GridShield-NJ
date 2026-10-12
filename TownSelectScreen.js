import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MORRIS_COUNTY_CONTACTS, setSelectedTown } from './location';
import { globalStyles, colors } from './styles';

export default function TownSelectScreen({ navigation }) {
    const towns = Object.keys(MORRIS_COUNTY_CONTACTS).sort();

    function selectTown(town) {
        setSelectedTown(town);
        navigation.goBack();
    }

    return (
        <SafeAreaView style={globalStyles.screenContainer} edges={['bottom']}>
            <ScrollView contentContainerStyle={globalStyles.screenContent}>
                <Text style={{ fontSize: 16, color: colors.textSecondary, marginBottom: 12 }}>
                    Select your town in Morris County.
                </Text>
                {towns.map((town) => (
                    <TouchableOpacity key={town} style={globalStyles.contactBlock} onPress={() => selectTown(town)}>
                        <Text style={globalStyles.contactName}>{town}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}
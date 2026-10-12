import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DirectoryScreen from './DirectoryScreen';
import TriageScreen from './TriageScreen';
import TreeCompanyScreen from './TreeCompanyScreen';
import ShelterScreen from './ShelterScreen';
import PdfViewScreen from './PdfViewScreen';
import RoadClosureScreen from './RoadClosureScreen';
import TownSelectScreen from './TownSelectScreen';
import RiskDetailScreen from './RiskDetailScreen';
import CheckLogScreen from './CheckLogScreen';
import { registerBackgroundTask } from './backgroundTask';

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    registerBackgroundTask();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Directory" component={DirectoryScreen} options={{ title: 'GridShield NJ' }} />
        <Stack.Screen name="Triage" component={TriageScreen} options={{ title: 'Medical Triage' }} />
        <Stack.Screen name="TreeCompany" component={TreeCompanyScreen} options={{ title: 'Tree Removal' }} />
        <Stack.Screen name="Shelter" component={ShelterScreen} options={{ title: 'Cooling/Warming Centers' }} />
        <Stack.Screen name="PdfView" component={PdfViewScreen} options={{ title: 'Emergency Pack' }} />
        <Stack.Screen name="RoadClosures" component={RoadClosureScreen} options={{ title: 'Road Conditions' }} />
        <Stack.Screen name="TownSelect" component={TownSelectScreen} options={{ title: 'Select Your Town' }} />
        <Stack.Screen name="RiskDetail" component={RiskDetailScreen} options={{ title: 'Risk Explanation' }} />
        <Stack.Screen name="CheckLog" component={CheckLogScreen} options={{ title: 'Check History' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
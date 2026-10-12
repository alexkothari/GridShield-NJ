import { useState } from 'react';
import { View, Text, TouchableOpacity, Linking, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles, colors } from './styles';

export default function TriageScreen({ navigation }) {
  const [step, setStep] = useState('start');

  if (step === 'start') {
    return (
      <SafeAreaView style={globalStyles.screenContainer} edges={['bottom']}>
        <ScrollView contentContainerStyle={globalStyles.screenContent}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: colors.text }}>
            Is this a life-threatening emergency right now?
          </Text>
          <Text style={{ marginTop: 8, color: colors.textSecondary }}>
            (Can't breathe, unresponsive, medical device has failed and someone is in danger)
          </Text>

          <TouchableOpacity
            style={[globalStyles.actionButton, { backgroundColor: colors.high, marginTop: 24 }]}
            onPress={() => setStep('emergency')}
          >
            <Text style={globalStyles.actionButtonText}>YES — this is an emergency</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[globalStyles.actionButton, { backgroundColor: '#ccc' }]}
            onPress={() => setStep('equipment')}
          >
            <Text style={[globalStyles.actionButtonText, { color: colors.text }]}>
              No, not life-threatening
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (step === 'emergency') {
    return (
      <SafeAreaView style={globalStyles.screenContainer} edges={['bottom']}>
        <ScrollView contentContainerStyle={globalStyles.screenContent}>
          <TouchableOpacity
            style={[globalStyles.actionButton, { backgroundColor: colors.high, padding: 24 }]}
            onPress={() => Linking.openURL('tel:911')}
          >
            <Text style={[globalStyles.actionButtonText, { fontSize: 24 }]}>Call 911</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (step === 'equipment') {
    return (
      <SafeAreaView style={globalStyles.screenContainer} edges={['bottom']}>
        <ScrollView contentContainerStyle={globalStyles.screenContent}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: colors.text }}>
            Does anyone in your home depend on electric medical equipment?
          </Text>
          <Text style={{ marginTop: 8, color: colors.textSecondary }}>
            (Oxygen concentrator, dialysis, ventilator, motorized wheelchair charging, etc.)
          </Text>

          <TouchableOpacity
            style={[globalStyles.actionButton, { backgroundColor: colors.moderate, marginTop: 24 }]}
            onPress={() => setStep('register')}
          >
            <Text style={globalStyles.actionButtonText}>Yes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[globalStyles.actionButton, { backgroundColor: '#ccc' }]}
            onPress={() => setStep('normal')}
          >
            <Text style={[globalStyles.actionButtonText, { color: colors.text }]}>No</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (step === 'register') {
    return (
      <SafeAreaView style={globalStyles.screenContainer} edges={['bottom']}>
        <ScrollView contentContainerStyle={globalStyles.screenContent}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.text }}>
            Register for Critical Care Priority
          </Text>
          <Text style={{ marginTop: 12, color: colors.textSecondary }}>
            Utilities keep a list of customers with medical equipment and prioritize
            them during outages. Registration requires a form signed by a doctor,
            renewed yearly — call now to start that process before an emergency happens.
          </Text>

          <TouchableOpacity
            style={[globalStyles.actionButton, { backgroundColor: colors.link, marginTop: 24 }]}
            onPress={() => Linking.openURL('tel:8004367734')}
          >
            <Text style={globalStyles.actionButtonText}>PSE&G Critical Care: 1-800-436-7734</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[globalStyles.actionButton, { backgroundColor: colors.link }]}
            onPress={() => Linking.openURL('tel:8006623115')}
          >
            <Text style={globalStyles.actionButtonText}>JCP&L Critical Care: 1-800-662-3115</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (step === 'normal') {
    return (
      <SafeAreaView style={globalStyles.screenContainer} edges={['bottom']}>
        <ScrollView contentContainerStyle={globalStyles.screenContent}>
          <Text style={{ fontSize: 18, color: colors.text }}>
            Okay — head back to the main directory to report your outage.
          </Text>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return null;
}
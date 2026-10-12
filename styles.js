import { StyleSheet } from 'react-native';

export const colors = {
  brand: '#1a3c34',
  background: '#f7f7f7',
  text: '#1a1a1a',
  textSecondary: '#5a5a5a',
  link: '#0066cc',
  low: '#2e7d32',
  moderate: '#e69500',
  high: '#c62828',
  treeButton: '#2e7d32',
  triageButton: '#c62828',
  shelterButton: '#2b6cb0',
  border: '#e0e0e0',
};

export const globalStyles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  screenContent: {
    padding: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginTop: 32,
    marginBottom: 4,
  },
  contactBlock: {
    marginTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  contactPhone: {
    fontSize: 15,
    color: colors.link,
    marginTop: 2,
  },
  smsText: {
    fontSize: 13,
    color: colors.low,
    marginTop: 2,
  },
  actionButton: {
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: 'center',
  },
  actionButtonText: {
    color: 'white',
    fontWeight: '700',
    textAlign: 'center',
    fontSize: 15,
  },
  riskBanner: {
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: 'center',
  },
  riskBannerText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 15,
    textAlign: 'center',
  },
});
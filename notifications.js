import * as Notifications from 'expo-notifications';

// This tells iOS how to display a notification if it arrives while the app is open
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function requestNotificationPermission() {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

export async function sendTestNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'GridShield NJ',
      body: 'This is a test notification!',
    },
    trigger: null,
  });
}

export async function sendRiskNotification(tier, score) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: `Outage Risk: ${tier.toUpperCase()}`,
      body: `Current risk score is ${score}/100. Tap to check GridShield NJ for details.`,
    },
    trigger: null,
  });
}
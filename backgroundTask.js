import * as TaskManager from 'expo-task-manager';
import * as BackgroundTask from 'expo-background-task';
import { fetchAlerts, calculateRisk } from './weather';
import { sendRiskNotification } from './notifications';
import { setupDatabase, cacheRiskSnapshot, logCheck } from './database';

const TASK_NAME = 'GRIDSHIELD_RISK_CHECK';

TaskManager.defineTask(TASK_NAME, async () => {
  try {
    const alerts = await fetchAlerts();
    const riskResult = calculateRisk(alerts);

    const db = await setupDatabase();
    await logCheck(db, riskResult.tier, riskResult.score, 'background');

    if (riskResult.tier !== 'low') {
      await cacheRiskSnapshot(db, riskResult.score, riskResult.tier);
      await sendRiskNotification(riskResult.tier, riskResult.score);
    }

    console.log('Background risk check ran:', riskResult.tier);
  } catch (err) {
    console.log('Background risk check failed:', err);
  }
});

export async function registerBackgroundTask() {
  const status = await BackgroundTask.getStatusAsync();

  if (status === BackgroundTask.BackgroundTaskStatus.Restricted) {
    console.log('Background tasks are restricted at the system level');
    return;
  }

  await BackgroundTask.registerTaskAsync(TASK_NAME, {
    minimumInterval: 30,
  });

  console.log('Background risk check task registered');
}
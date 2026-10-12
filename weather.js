const LAT = 40.8437;
const LON = -74.5834;

export async function fetchAlerts() {
  const url = `https://api.weather.gov/alerts/active?point=${LAT},${LON}`;

  const response = await fetch(url, {
    headers: {
      'User-Agent': 'GridShieldNJ (personal project, learning)',
    },
  });

  const data = await response.json();
  return data.features;
}

const SEVERITY_POINTS = {
  Extreme: 40,
  Severe: 25,
  Moderate: 10,
  Minor: 3,
};

function scoreOneAlert(alert) {
  const severity = alert.properties.severity;
  const points = SEVERITY_POINTS[severity] || 0;
  return points;
}

export function calculateRisk(alerts) {
  if (alerts.length === 0) {
    return { score: 0, tier: 'low', breakdown: [] };
  }

  const breakdown = alerts.map((alert) => ({
    event: alert.properties.event,
    severity: alert.properties.severity,
    points: scoreOneAlert(alert),
  }));

  const topScore = Math.max(...breakdown.map((b) => b.points));

  let tier = 'low';
  if (topScore >= 40) tier = 'high';
  else if (topScore >= 10) tier = 'moderate';

  return { score: topScore, tier, breakdown };
}

export function getFakeAlerts(scenario) {
  if (scenario === 'moderate') {
    return [
      { properties: { severity: 'Moderate', event: 'Wind Advisory' } },
    ];
  }

  if (scenario === 'high') {
    return [
      { properties: { severity: 'Extreme', event: 'Blizzard Warning' } },
    ];
  }

  return [];
}
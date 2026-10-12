import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system/legacy';

export async function generateEmergencyPack(utilities, localContacts, treeCompanies, townName) {
  const utilityRows = utilities
    .map((u) => `<tr><td>${u.name}</td><td>${u.display}</td><td>${u.sms ? `Text "STAT" to ${u.sms}` : '-'}</td></tr>`)
    .join('');

  const localRows = localContacts
    .map((c) => `<tr><td>${c.name}</td><td>${c.display}</td></tr>`)
    .join('');

  const treeRows = treeCompanies
    .map((t) => `<tr><td>${t.name}</td><td>${t.display}</td></tr>`)
    .join('');

  const html = `
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          body { font-family: -apple-system, Helvetica, Arial, sans-serif; font-size: 14px; color: #1a1a1a; padding: 26px; }
          h1 { font-size: 21px; color: #1a3c34; margin-bottom: 3px; }
          h2 { font-size: 15px; color: #1a3c34; margin-top: 12px; margin-bottom: 4px; border-bottom: 1px solid #1a3c34; padding-bottom: 3px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 4px; }
          td { padding: 3px 6px; border-bottom: 1px solid #eee; font-size: 13px; }
          .subtitle { color: #666; font-size: 12px; margin-bottom: 10px; }
          .body-text { font-size: 12px; line-height: 1.4; }
          ul { margin: 4px 0; padding-left: 18px; }
          li { margin-bottom: 3px; font-size: 12px; line-height: 1.35; }
        </style>
      </head>
      <body>
        <h1>GridShield NJ. Emergency Contact Pack</h1>
        <div class="subtitle">${townName}, New Jersey. Keep this printed copy accessible if power or signal is lost.</div>

        <h2>Report an Outage</h2>
        <table>${utilityRows}</table>

        <h2>Local Emergency (Non-911)</h2>
        <table>${localRows}</table>

        <h2>Tree Removal</h2>
        <table>${treeRows}</table>

        <h2>Food Safety</h2>
        <ul>
          <li>Refrigerator: safe about 4 hours without power (unopened).</li>
          <li>Full freezer: safe about 48 hours.</li>
          <li>Half full freezer: safe about 24 hours.</li>
          <li>After that, discard perishables such as meat, fish, eggs, milk, and leftovers.</li>
          <li>When in doubt, throw it out. Source: CDC, FDA, USDA.</li>
        </ul>

        <h2>During an Outage</h2>
        <ul>
          <li>Keep refrigerator and freezer doors closed as much as possible.</li>
          <li>Never use a generator, grill, or camp stove indoors.</li>
          <li>Report downed power lines. Do not approach them.</li>
          <li>Unplug sensitive electronics to protect against power surges.</li>
        </ul>

        <h2>Statewide Resource</h2>
        <div class="body-text">
          Call 2-1-1 for New Jersey's 24 hour emergency information and referral hotline, including help locating open cooling or warming centers.
        </div>
      </body>
    </html>
  `;

  const { uri } = await Print.printToFileAsync({ html });

  const fileName = `GridShieldNJ_${townName}_EmergencyPack.pdf`;
  const newUri = `${FileSystem.cacheDirectory}${fileName}`;

  await FileSystem.moveAsync({
    from: uri,
    to: newUri,
  });

  return newUri;
}
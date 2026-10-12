import * as SQLite from 'expo-sqlite';

export async function setupDatabase() {
  const db = await SQLite.openDatabaseAsync('gridshield5.db');

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      phone TEXT,
      display TEXT,
      category TEXT,
      sms TEXT
    );

    CREATE TABLE IF NOT EXISTS risk_snapshots (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      score INTEGER,
      tier TEXT,
      fetched_at TEXT
    );

    CREATE TABLE IF NOT EXISTS check_log (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      checked_at TEXT,
      tier TEXT,
      score INTEGER,
      source TEXT
    );
  `);

  return db;
}

export async function seedContacts(db) {
  const existing = await db.getAllAsync('SELECT * FROM contacts');
  if (existing.length > 0) {
    console.log('Contacts already seeded, skipping.');
    return;
  }

  const allContacts = [
    { name: 'PSE&G', phone: '8004367734', display: '1-800-436-7734', category: 'utility', sms: '47734' },
    { name: 'JCP&L', phone: '8885444877', display: '1-888-544-4877', category: 'utility', sms: null },
    { name: 'Atlantic City Electric', phone: '8008337476', display: '1-800-833-7476', category: 'utility', sms: null },
    { name: 'Randolph Police', phone: '9739897000', display: '973-989-7000', category: 'local', sms: null },
    { name: 'Morris County Office of Emergency Management', phone: '9738298600', display: '1-973-829-8600', category: 'local', sms: null },
  ];

  for (const c of allContacts) {
    await db.runAsync(
      'INSERT INTO contacts (name, phone, display, category, sms) VALUES (?, ?, ?, ?, ?)',
      [c.name, c.phone, c.display, c.category, c.sms]
    );
  }

  console.log('Contacts seeded!');
}

export async function cacheRiskSnapshot(db, score, tier) {
  await db.runAsync(
    'INSERT INTO risk_snapshots (score, tier, fetched_at) VALUES (?, ?, ?)',
    [score, tier, new Date().toISOString()]
  );
}

export async function getLatestRiskSnapshot(db) {
  const row = await db.getFirstAsync(
    'SELECT * FROM risk_snapshots ORDER BY fetched_at DESC LIMIT 1'
  );
  return row;
}

export async function logCheck(db, tier, score, source) {
  await db.runAsync(
    'INSERT INTO check_log (checked_at, tier, score, source) VALUES (?, ?, ?, ?)',
    [new Date().toISOString(), tier, score, source]
  );
}

export async function getRecentChecks(db, limit = 20) {
  return await db.getAllAsync(
    'SELECT * FROM check_log ORDER BY checked_at DESC LIMIT ?',
    [limit]
  );
}
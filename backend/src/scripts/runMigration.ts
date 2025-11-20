import { Pool } from 'pg';
import dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 5432),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
});

async function runMigration() {
  try {
    console.log('🔄 Connecting to Azure PostgreSQL database...');

    const client = await pool.connect();
    console.log('✅ Connected successfully!');

    const migrationPath = path.join(__dirname, '../../migrations/001_create_use_cases_table.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf-8');

    console.log('🔄 Running migration...');
    await client.query(migrationSQL);
    console.log('✅ Migration completed successfully!');

    client.release();
    await pool.end();

    console.log('✅ All done! Database is ready.');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

runMigration();

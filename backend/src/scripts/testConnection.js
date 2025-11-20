const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 5432),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
});

async function testConnection() {
  try {
    console.log('🔄 Testing connection to Azure PostgreSQL...');

    const client = await pool.connect();
    console.log('✅ Connection successful!');

    const result = await client.query('SELECT COUNT(*) FROM use_cases');
    console.log(`📊 Use cases table exists with ${result.rows[0].count} records`);

    const tableInfo = await client.query(`
      SELECT column_name, data_type
      FROM information_schema.columns
      WHERE table_name = 'use_cases'
      ORDER BY ordinal_position
    `);
    console.log('\n📋 Table structure:');
    tableInfo.rows.forEach(col => {
      console.log(`   - ${col.column_name}: ${col.data_type}`);
    });

    client.release();
    await pool.end();

    console.log('\n✅ Database is connected and ready to use!');
  } catch (error) {
    console.error('❌ Connection test failed:', error);
    process.exit(1);
  }
}

testConnection();

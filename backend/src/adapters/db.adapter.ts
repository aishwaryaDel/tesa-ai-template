import { Sequelize } from 'sequelize-typescript';
import { DB_CONFIG, APP_CONFIG } from '../config';
import path from 'path';

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: DB_CONFIG.HOST,
  port: DB_CONFIG.PORT,
  username: DB_CONFIG.USER,
  password: DB_CONFIG.PASSWORD,
  database: DB_CONFIG.DATABASE,
  dialectOptions: {
    ssl: DB_CONFIG.SSL ? { rejectUnauthorized: false } : false,
  },
  models: [path.join(__dirname, '../models/**/*.model.ts')],
  logging: APP_CONFIG.NODE_ENV === 'development' ? console.log : false,
});

export class DatabaseAdapter {
  private static instance: DatabaseAdapter;
  private sequelize: Sequelize;

  private constructor() {
    this.sequelize = sequelize;
  }

  static getInstance(): DatabaseAdapter {
    if (!DatabaseAdapter.instance) {
      DatabaseAdapter.instance = new DatabaseAdapter();
    }
    return DatabaseAdapter.instance;
  }

  async connect(): Promise<void> {
    try {
      await this.sequelize.authenticate();
      console.log('✅ Successfully connected to PostgreSQL via Sequelize');
    } catch (error) {
      console.error('❌ Database connection failed:', error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    await this.sequelize.close();
    console.log('🔌 Database connection closed');
  }

  getSequelize(): Sequelize {
    return this.sequelize;
  }

  async query<T>(sql: string, params?: any[]): Promise<T[]> {
    const start = Date.now();
    const [results] = await this.sequelize.query(sql, {
      replacements: params,
    });
    const duration = Date.now() - start;

    if (APP_CONFIG.NODE_ENV === 'development') {
      console.log('⏱️  SQL Query:', { sql, duration, rows: (results as any[]).length });
    }

    return results as T[];
  }
}

export const dbAdapter = DatabaseAdapter.getInstance();

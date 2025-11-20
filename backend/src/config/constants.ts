export const VALID_STATUSES = [
  'Ideation',
  'Pre-Evaluation',
  'Evaluation',
  'PoC',
  'MVP',
  'Live',
  'Archived',
] as const;

export const VALID_DEPARTMENTS = [
  'Marketing',
  'R&D',
  'Procurement',
  'IT',
  'HR',
  'Operations',
] as const;

export const APP_CONFIG = {
  PORT: process.env.PORT || 3001,
  NODE_ENV: process.env.NODE_ENV || 'development',
};

export const DB_CONFIG = {
  HOST: process.env.DB_HOST,
  PORT: Number(process.env.DB_PORT || 5432),
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DATABASE: process.env.DB_NAME,
  SSL: process.env.DB_SSL === 'true',
};

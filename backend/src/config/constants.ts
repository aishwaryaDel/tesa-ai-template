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

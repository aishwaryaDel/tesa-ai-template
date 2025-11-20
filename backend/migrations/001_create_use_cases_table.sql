-- Create use_cases table
-- This migration creates the main table for storing AI use cases in the Tesa AI Hub

CREATE TABLE IF NOT EXISTS use_cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  short_description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  department VARCHAR(50) NOT NULL,
  status VARCHAR(50) NOT NULL,
  owner_name VARCHAR(255) NOT NULL,
  owner_email VARCHAR(255) NOT NULL,
  image_url TEXT,
  business_impact TEXT,
  technology_stack JSONB DEFAULT '[]'::jsonb,
  internal_links JSONB DEFAULT '{}'::jsonb,
  tags JSONB DEFAULT '[]'::jsonb,
  related_use_case_ids JSONB DEFAULT '[]'::jsonb,
  application_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_use_cases_department ON use_cases(department);
CREATE INDEX IF NOT EXISTS idx_use_cases_status ON use_cases(status);
CREATE INDEX IF NOT EXISTS idx_use_cases_created_at ON use_cases(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_use_cases_tags ON use_cases USING GIN(tags);

-- Add check constraints
ALTER TABLE use_cases
  DROP CONSTRAINT IF EXISTS check_department,
  ADD CONSTRAINT check_department CHECK (
    department IN ('Marketing', 'R&D', 'Procurement', 'IT', 'HR', 'Operations')
  );

ALTER TABLE use_cases
  DROP CONSTRAINT IF EXISTS check_status,
  ADD CONSTRAINT check_status CHECK (
    status IN ('Ideation', 'Pre-Evaluation', 'Evaluation', 'PoC', 'MVP', 'Live', 'Archived')
  );

-- Add email validation constraint
ALTER TABLE use_cases
  DROP CONSTRAINT IF EXISTS check_email_format,
  ADD CONSTRAINT check_email_format CHECK (
    owner_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
  );

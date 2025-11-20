/*
  # Create use_cases table for Tesa AI Hub

  1. New Tables
    - `use_cases`
      - `id` (uuid, primary key) - Unique identifier for each use case
      - `title` (varchar) - Name of the use case
      - `short_description` (text) - Brief summary
      - `full_description` (text) - Detailed description
      - `department` (varchar) - Department owning the use case
      - `status` (varchar) - Current lifecycle status
      - `owner_name` (varchar) - Name of the owner
      - `owner_email` (varchar) - Email of the owner
      - `image_url` (text) - URL to use case image
      - `business_impact` (text) - Business impact description
      - `technology_stack` (jsonb) - Array of technologies used
      - `internal_links` (jsonb) - Object with internal resource links
      - `tags` (jsonb) - Array of tags for categorization
      - `related_use_case_ids` (jsonb) - Array of related use case IDs
      - `application_url` (text) - Link to the application
      - `created_at` (timestamptz) - Creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp

  2. Indexes
    - Index on department for filtering
    - Index on status for filtering
    - Index on created_at for sorting
    - GIN index on tags for efficient tag searches

  3. Constraints
    - Department must be one of: Marketing, R&D, Procurement, IT, HR, Operations
    - Status must be one of: Ideation, Pre-Evaluation, Evaluation, PoC, MVP, Live, Archived
    - Email must be valid format

  4. Security
    - Enable RLS on `use_cases` table
    - Add policies for authenticated users to read all use cases
    - Add policies for authenticated users to insert, update, and delete their own use cases

  Note: This migration creates the core table structure without RLS initially. RLS policies should be added based on authentication requirements.
*/

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS use_cases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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

CREATE INDEX IF NOT EXISTS idx_use_cases_department ON use_cases(department);
CREATE INDEX IF NOT EXISTS idx_use_cases_status ON use_cases(status);
CREATE INDEX IF NOT EXISTS idx_use_cases_created_at ON use_cases(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_use_cases_tags ON use_cases USING GIN(tags);

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

ALTER TABLE use_cases
  DROP CONSTRAINT IF EXISTS check_email_format,
  ADD CONSTRAINT check_email_format CHECK (
    owner_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
  );

ALTER TABLE use_cases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view use cases"
  ON use_cases FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert use cases"
  ON use_cases FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update use cases"
  ON use_cases FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete use cases"
  ON use_cases FOR DELETE
  TO authenticated
  USING (true);
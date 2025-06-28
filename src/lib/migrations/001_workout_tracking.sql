-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create workout_sessions table
CREATE TABLE IF NOT EXISTS workout_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL, -- Clerk user ID
  started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  name TEXT NOT NULL,
  notes TEXT,
  total_volume DECIMAL(10,2) DEFAULT 0,
  total_sets INTEGER DEFAULT 0,
  duration_seconds INTEGER,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create exercise_logs table
CREATE TABLE IF NOT EXISTS exercise_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID NOT NULL REFERENCES workout_sessions(id) ON DELETE CASCADE,
  exercise_id TEXT NOT NULL,
  exercise_name TEXT NOT NULL,
  body_part TEXT,
  equipment TEXT,
  order_in_workout INTEGER NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create set_logs table
CREATE TABLE IF NOT EXISTS set_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  exercise_log_id UUID NOT NULL REFERENCES exercise_logs(id) ON DELETE CASCADE,
  set_number INTEGER NOT NULL,
  weight_kg DECIMAL(10,2),
  reps INTEGER NOT NULL,
  rest_seconds INTEGER,
  rpe DECIMAL(3,1) CHECK (rpe >= 1 AND rpe <= 10),
  is_warmup BOOLEAN DEFAULT FALSE,
  is_failure BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create personal_records table
CREATE TABLE IF NOT EXISTS personal_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL, -- Clerk user ID
  exercise_id TEXT NOT NULL,
  exercise_name TEXT NOT NULL,
  weight_kg DECIMAL(10,2) NOT NULL,
  reps INTEGER NOT NULL,
  one_rm_estimate DECIMAL(10,2),
  achieved_at TIMESTAMP WITH TIME ZONE NOT NULL,
  session_id UUID REFERENCES workout_sessions(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_workout_sessions_user_id ON workout_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_workout_sessions_status ON workout_sessions(status);
CREATE INDEX IF NOT EXISTS idx_workout_sessions_started_at ON workout_sessions(started_at DESC);
CREATE INDEX IF NOT EXISTS idx_exercise_logs_session_id ON exercise_logs(session_id);
CREATE INDEX IF NOT EXISTS idx_set_logs_exercise_log_id ON set_logs(exercise_log_id);
CREATE INDEX IF NOT EXISTS idx_personal_records_user_id ON personal_records(user_id);
CREATE INDEX IF NOT EXISTS idx_personal_records_exercise_id ON personal_records(user_id, exercise_id);

-- Enable Row Level Security
ALTER TABLE workout_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercise_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE set_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE personal_records ENABLE ROW LEVEL SECURITY;

-- Helper function to get the current user ID from JWT
CREATE OR REPLACE FUNCTION auth.jwt() RETURNS jsonb
LANGUAGE sql STABLE
AS $$
  SELECT current_setting('request.jwt.claims', true)::jsonb;
$$;

-- Helper function to get the user ID from JWT
CREATE OR REPLACE FUNCTION auth.user_id() RETURNS text
LANGUAGE sql STABLE
AS $$
  SELECT COALESCE(auth.jwt()->>'sub', '')::text;
$$;

-- RLS Policies for workout_sessions
CREATE POLICY "Users can view their own workout sessions"
  ON workout_sessions FOR SELECT
  USING (auth.user_id() = user_id);

CREATE POLICY "Users can create their own workout sessions"
  ON workout_sessions FOR INSERT
  WITH CHECK (auth.user_id() = user_id);

CREATE POLICY "Users can update their own workout sessions"
  ON workout_sessions FOR UPDATE
  USING (auth.user_id() = user_id)
  WITH CHECK (auth.user_id() = user_id);

CREATE POLICY "Users can delete their own workout sessions"
  ON workout_sessions FOR DELETE
  USING (auth.user_id() = user_id);

-- RLS Policies for exercise_logs
CREATE POLICY "Users can view their exercise logs"
  ON exercise_logs FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM workout_sessions 
    WHERE workout_sessions.id = exercise_logs.session_id 
    AND workout_sessions.user_id = auth.user_id()
  ));

CREATE POLICY "Users can create exercise logs for their sessions"
  ON exercise_logs FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM workout_sessions 
    WHERE workout_sessions.id = exercise_logs.session_id 
    AND workout_sessions.user_id = auth.user_id()
  ));

CREATE POLICY "Users can update their exercise logs"
  ON exercise_logs FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM workout_sessions 
    WHERE workout_sessions.id = exercise_logs.session_id 
    AND workout_sessions.user_id = auth.user_id()
  ));

CREATE POLICY "Users can delete their exercise logs"
  ON exercise_logs FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM workout_sessions 
    WHERE workout_sessions.id = exercise_logs.session_id 
    AND workout_sessions.user_id = auth.user_id()
  ));

-- RLS Policies for set_logs
CREATE POLICY "Users can view their set logs"
  ON set_logs FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM exercise_logs 
    JOIN workout_sessions ON workout_sessions.id = exercise_logs.session_id
    WHERE exercise_logs.id = set_logs.exercise_log_id 
    AND workout_sessions.user_id = auth.user_id()
  ));

CREATE POLICY "Users can create set logs for their exercises"
  ON set_logs FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM exercise_logs 
    JOIN workout_sessions ON workout_sessions.id = exercise_logs.session_id
    WHERE exercise_logs.id = set_logs.exercise_log_id 
    AND workout_sessions.user_id = auth.user_id()
  ));

CREATE POLICY "Users can update their set logs"
  ON set_logs FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM exercise_logs 
    JOIN workout_sessions ON workout_sessions.id = exercise_logs.session_id
    WHERE exercise_logs.id = set_logs.exercise_log_id 
    AND workout_sessions.user_id = auth.user_id()
  ));

CREATE POLICY "Users can delete their set logs"
  ON set_logs FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM exercise_logs 
    JOIN workout_sessions ON workout_sessions.id = exercise_logs.session_id
    WHERE exercise_logs.id = set_logs.exercise_log_id 
    AND workout_sessions.user_id = auth.user_id()
  ));

-- RLS Policies for personal_records
CREATE POLICY "Users can view their own personal records"
  ON personal_records FOR SELECT
  USING (auth.user_id() = user_id);

CREATE POLICY "Users can create their own personal records"
  ON personal_records FOR INSERT
  WITH CHECK (auth.user_id() = user_id);

CREATE POLICY "Users can update their own personal records"
  ON personal_records FOR UPDATE
  USING (auth.user_id() = user_id)
  WITH CHECK (auth.user_id() = user_id);

CREATE POLICY "Users can delete their own personal records"
  ON personal_records FOR DELETE
  USING (auth.user_id() = user_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_workout_sessions_updated_at
  BEFORE UPDATE ON workout_sessions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_exercise_logs_updated_at
  BEFORE UPDATE ON exercise_logs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column(); 
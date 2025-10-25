CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  contact text DEFAULT '',
  first_name text DEFAULT '',
  last_name text DEFAULT '',
  year_of_birth text DEFAULT '',
  gender text DEFAULT '',
  phone_number text DEFAULT '',
  alternate_phone text DEFAULT '',
  address text DEFAULT '',
  pincode text DEFAULT '',
  domicile_state text DEFAULT '',
  domicile_country text DEFAULT '',
  school_college text DEFAULT '',
  highest_degree text DEFAULT '',
  course text DEFAULT '',
  year_of_completion text DEFAULT '',
  grade text DEFAULT '',
  skills text DEFAULT '',
  projects text DEFAULT '',
  work_experience jsonb DEFAULT '[]'::jsonb,
  linkedin_url text DEFAULT '',
  resume_url text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access"
  ON users
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public insert access"
  ON users
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public update access"
  ON users
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete access"
  ON users
  FOR DELETE
  TO public
  USING (true);

-- Insert sample data
INSERT INTO users (name, email, contact) VALUES
  ('Dave Richards', 'dave@mail.com', '+91 8332883854'),
  ('Abhishek Hari', 'hari@mail.com', '+91 9876543210'),
  ('Nishta Gupta', 'nishta@mail.com', '+91 8765432109')
ON CONFLICT (email) DO NOTHING;
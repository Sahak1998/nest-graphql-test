-- Fighters Table
CREATE TABLE fighters (
  id UUID PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  nickname VARCHAR(255),
  date_of_birth DATE,
  nationality VARCHAR(255),
  height VARCHAR(50),
  weight NUMERIC,
  reach VARCHAR(50),
  stance VARCHAR(50),
  wins INTEGER DEFAULT 0,
  losses INTEGER DEFAULT 0,
  draws INTEGER DEFAULT 0,
  knockouts INTEGER DEFAULT 0,
  submissions INTEGER DEFAULT 0,
  ranking_points INTEGER DEFAULT 0,
  weight_class_id UUID REFERENCES weight_classes(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Weight Classes Table
CREATE TABLE weight_classes (
  id UUID PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  weight_limit NUMERIC NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Events Table
CREATE TABLE events (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  date TIMESTAMP NOT NULL,
  location VARCHAR(255) NOT NULL,
  venue VARCHAR(255),
  description TEXT,
  is_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Fights Table
CREATE TABLE fights (
  id UUID PRIMARY KEY,
  event_id UUID REFERENCES events(id),
  fighter1_id UUID REFERENCES fighters(id),
  fighter2_id UUID REFERENCES fighters(id),
  winner_id UUID,
  result VARCHAR(50),
  round INTEGER,
  time VARCHAR(20),
  is_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); 
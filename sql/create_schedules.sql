DROP TABLE IF EXISTS schedules;

CREATE TABLE IF NOT EXISTS schedules (
  user_id serial PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  day SMALLINT NOT NULL CHECK (day >= 1 AND day <= 7),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL CHECK (end_time > start_time)
);
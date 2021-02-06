DROP TABLE IF EXISTS users_organisations CASCADE;


CREATE TABLE users_organisations (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  organisations_id INTEGER REFERENCES organisations(id) ON DELETE CASCADE
);

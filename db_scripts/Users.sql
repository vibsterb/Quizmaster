CREATE TABLE "Users" (
 id serial PRIMARY KEY,
 username text NOT NULL UNIQUE,
 email text NOT NULL UNIQUE,
 password text NOT NULL,
 role text DEFAULT 'user'
)

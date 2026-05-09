-- Aura AI Database Initialization
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create the aura_ai database if it doesn't exist
SELECT 'CREATE DATABASE aura_ai'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'aura_ai')\gexec

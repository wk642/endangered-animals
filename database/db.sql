-- create database
-- This drop is a little bit of an error handling, incase there was already this database we are going to drop it and create one. 
DROP DATABASE "sightingsDB";
CREATE DATABASE "sightingsDB";

-- connecting to the database (if this is skipped, I did not know we can create tables outside of the database, but it sure did)
\c "sightingsDB";

-- creating the tables
-- species table
CREATE TABLE IF NOT EXISTS species (
  -- After speaking with Kaylah about security, decided to randomly generate the id instead using UUID to generate a random id instead (https://starkandwayne.com/blog/uuid-primary-keys-in-postgresql/)
  -- id SERIAL PRIMARY KEY,
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  common_name VARCHAR(255),
  scientific_name VARCHAR(255),
  species_population INTEGER,
  conservation_code VARCHAR(10),
  -- Automatic initialization and updating to the current date and time can be specified using DEFAULT CURRENT_TIMESTAMP (https://www.w3schools.com/sql/sql_datatypes.asp)
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- individuals table
CREATE TABLE IF NOT EXISTS individuals (
  -- id SERIAL PRIMARY KEY NOT NULL,
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  individual_nickname VARCHAR (255),
  -- this would be a foreign key 
  species_id UUID REFERENCES species(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- sightings table
CREATE TABLE IF NOT EXISTS sightings (
  -- id SERIAL PRIMARY KEY,
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sighting_date_time TIMESTAMP,
  sighted_animal_id UUID REFERENCES individuals(id),
  animal_health BOOLEAN,
  sighter_email VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- info from https://www.iucnredlist.org/resources/summary-statistics
-- inserts into tables
-- species - at least 3 
INSERT INTO species (common_name, scientific_name, species_population, conservation_code) VALUES
('Mammals', 'Felis catus', 6736, 'CNC'),
('Birds', 'Turdus migratorius', 11195, 'CNC'),
('Amphibians', 'Lithobates catesbeianus', 8776, 'CNC'),
-- ('Fish', 'Oncorhynchus mykiss', 36953, 'CNC'),
-- ('Insects', 'Apis mellifera', 1053578, 'CNC'),
-- ('Arachnids', 'Araneus diadematus', 95966, 'CNC'),
-- ('Crustaceans', 'Homarus americanus', 90820, 'CNC');

-- individuals
-- sightings
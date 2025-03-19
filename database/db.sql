-- create database
CREATE DATABASE endangeredAnimalsSightingsDB;

-- creating the tables
-- species table
CREATE TABLE IF NOT EXISTS species (
  id SERIAL PRIMARY KEY,
  common_name VARCHAR(255),
  scientific_name VARCHAR(255),
  species_population INTEGER,
  conservation_code VARCHAR(10),
  -- Automatic initialization and updating to the current date and time can be specified using DEFAULT CURRENT_TIMESTAMP (https://www.w3schools.com/sql/sql_datatypes.asp)
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- individuals table
CREATE TABLE IF NOT EXISTS individuals (
  id SERIAL PRIMARY KEY,
  individual_nickname VARCHAR (255),
  speices VARCHAR (255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- sightings table
CREATE TABLE IF NOT EXISTS sightings (
  id SERIAL PRIMARY KEY,
  sighting_date_time TIMESTAMP,
  animal_health BOOLEAN,
  sighter_email VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
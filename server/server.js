import express from 'express';
import cors from 'cors';
import pgPromise from 'pg-promise';
// using npm documentation for pg-promise https://www.npmjs.com/package/pg-promise

const app = express();
const port = 5000; 

// initialize pg-promise
const pgp = pgPromise();
// connect to the database
const db = pgp('postgres://tpl622_6@localhost:5432/sightingsDB');

app.use(cors());
app.use(express.json());

// testing to make sure this connects
app.get('/test connections', (req, res) => {
  res.json("Welcome! Let's record some endangered animals");
});

// display all the species
app.get('/species', async (req,res) => {
  try {
    const species = await db.any('SELECT * FROM species');
    res.json(species);
  } catch (error) {
    console.error("Error in getting all the species");
    res.status(500).json({error:'Error in getting all the species'})
  }
})

// display all the individuals
app.get('/individuals', async (req,res) => {
  try {
    const individuals = await db.any('SELECT * FROM individuals');
    res.json(individuals);
  } catch (error) {
    console.error("Error in getting all the individuals");
    res.status(500).json({error:'Error in getting all the individuals'})
  }
})

// display all the sightings
app.get('/sightings', async (req,res) => {
  try {
    const sightings = await db.any('SELECT * FROM sightings');
    res.json(sightings);
  } catch (error) {
    console.error("Error in getting all the sightings");
    res.status(500).json({error:'Error in getting all the sightings'})
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
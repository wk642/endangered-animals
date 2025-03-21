  import express from 'express';
  import cors from 'cors';
  import pgPromise from 'pg-promise';
  // using npm documentation for pg-promise https://www.npmjs.com/package/pg-promise

  const app = express();
  const port = 5000; 

  // Use this to help with figuring out the connection https://stackoverflow.com/questions/36120435/verify-database-connection-with-pg-promise-when-starting-an-app
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
  // doing the join here. 
  // linking the animal to the species by using the id from species id in this table to the id in species, so that I can dispaly the common name rather than the id.
  app.get('/individuals', async (req,res) => {
    try {
      const individuals = await db.any(`
        SELECT
        individuals.id,
        individuals.individual_nickname,
        individuals.species_id,
        individuals.created_at,
        species.common_name
      FROM
        individuals
      JOIN
        species ON individuals.species_id = species.id;
      `);
      res.json(individuals);
    } catch (error) {
      console.error("Error in getting all the individuals");
      res.status(500).json({ error: 'Error in getting all the individuals' });
    }
  });

  // display all the sightings
  // doing another join here
  // this way the animal name can be displayed 
  app.get('/sightings', async (req, res) => {
    try {
      // const sightings = await db.any('SELECT * FROM sightings');
      const sightings = await db.any(`
        SELECT
          sighting.sighting_date_time,
          sighting.animal_health,
          sighting.sighter_email,
          sighting.sighted_location,
          sighting.created_at,
          sighting.id,
          individual.individual_nickname
        FROM
          sightings sighting
        JOIN
          individuals individual ON sighting.sighted_animal_id = individual.id;
      `);
      res.json(sightings);
    } catch (error) {
      console.error('Error fetching sightings:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // add species - POST
  app.post('/species', async (req, res) => {
    try {
      const { common_name, scientific_name, species_population, conservation_code } = req.body;
      await db.none(
        'INSERT INTO species (common_name, scientific_name, species_population, conservation_code) VALUES ($1, $2, $3, $4)',
        [common_name, scientific_name, species_population, conservation_code]
      );
      res.status(200).send('Species added successfully');
    } catch (error) {
      console.error('Error adding species:', error);
      res.status(500).json({ error: 'Unable to add species' });
    }
  });

  // add individuals - POST
  app.post('/individuals', async (req, res) => {
    try {
      const { individual_nickname, species_id} = req.body;
      await db.none(
        'INSERT INTO individuals (individual_nickname, species_id) VALUES ($1, $2)',
        [individual_nickname, species_id]
      );
      res.status(200).send('Individual added successfully');
    } catch (error) {
      console.error(error); 
      res.status(500).json({ error: 'Unable to add individual' });
    }
  });

  // add sightings - POST
  app.post('/sightings', async (req, res) => {
    try {
      const {
        sighting_date_time,
        sighted_animal_id,
        animal_health,
        sighter_email,
        sighted_location,
      } = req.body;
  
      await db.any(
        'INSERT INTO sightings (sighting_date_time, sighted_animal_id, animal_health, sighter_email, sighted_location) VALUES ($1, $2, $3, $4, $5)',
        [
          sighting_date_time,
          sighted_animal_id,
          animal_health,
          sighter_email,
          sighted_location,
        ]
      );
  
      res.status(200).send('Sighting added successfully');
    } catch (error) {
      console.error('Error adding sighting:', error);
      res.status(500).json({ error: 'Unable to add sighting' });
    }
  });


  // delete species by getting the id when button is clicked
  app.delete('/species/:id', async (req, res) => {
    const deleteSpeciesId = req.params.id;
    // check to see if what I'm passing is working
    console.log(`paramsId`, deleteSpeciesId); 
  
    try {
      await db.any('DELETE FROM species WHERE id = $1', [deleteSpeciesId]); 
      res.status(200).json({ message: 'Species deleted successfully' });
    } catch (error) {
      console.error('Error deleting species:', error); 
      res.status(500).json({ error: 'Unable to delete species' });
    }
  });

   // delete individuals by getting the id when button is clicked
   app.delete('/individuals/:id', async (req, res) => {
    const deleteIndividualId = req.params.id;
    // check to see if what I'm passing is working
    console.log(`paramsId`, deleteIndividualId); 
  
    try {
      await db.any('DELETE FROM individuals WHERE id = $1', [deleteIndividualId]); 
      res.status(200).json({ message: 'Individual deleted successfully' });
    } catch (error) {
      console.error('Error deleting individual:', error); 
      res.status(500).json({ error: 'Unable to delete individual' });
    }
  });

 // delete sightings by getting the id when button is clicked
 app.delete('/sightings/:id', async (req, res) => {
  const deleteSightingsId = req.params.id;
  // check to see if what I'm passing is working
  console.log(`paramsId`, deleteSightingsId); 

  try {
    await db.any('DELETE FROM sightings WHERE id = $1', [deleteSightingsId]); 
    res.status(200).json({ message: 'Individual deleted successfully' });
  } catch (error) {
    console.error('Error deleting sightings:', error); 
    res.status(500).json({ error: 'Unable to delete sightings' });
  }
});

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
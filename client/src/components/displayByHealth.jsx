import React, { useState, useEffect, useRef } from 'react';

function DisplayByHealth({ sightings, individuals}) {
  // setting the states
  const [displayHealth, setDisplayHealth] = useState(false);
  const [filteredSightings, setFilteredSightings] = useState(sightings);
  const storeAnimalName = useRef({});

  useEffect(() => {
    if (displayHealth) {
      setFilteredSightings(sightings.filter((sighting) => sighting.animal_health));
    } else {
      setFilteredSightings(sightings);
    }
  }, [sightings, displayHealth]);

  // to get the name instead of the animal id
  useEffect(() => {
    if(individuals){
      individuals.forEach((animal) => {
        storeAnimalName.current[animal.id] = animal.individual_nickname;
        console.log("storeAnimalName: ", storeAnimalName.current);
      });
    }
  },[individuals]);


  // handle checkbox
  const handleCheckboxChange = (e) => {
    setDisplayHealth(e.target.checked);
  };

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={displayHealth}
          onChange={handleCheckboxChange}
        />
        Show Healthy Only
      </label>

      <ul>
        {filteredSightings.map((sighting) => {
          const animalName = storeAnimalName[sighting.sighted_animal_id];

          return (
            <li key={sighting.id}>
              <ul>
                {/* This is still not displaying the name, working on it. */}
                <li>Animal: {animalName}</li>
                <li>Health: {sighting.animal_health ? 'Healthy' : 'Not Healthy'}</li>
                <li>Location: {sighting.sighted_location}</li>
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default DisplayByHealth;
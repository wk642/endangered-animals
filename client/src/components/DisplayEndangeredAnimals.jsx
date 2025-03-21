import React, { useState, useEffect } from 'react';
import SpeciesCard from './SpeciesCard';
import IndividualCard from './IndividualCard';
import SightingCard from './SightingCard';

function DisplayEndangeredAnimals() {
  // set states
  const [species, setSpecies] = useState([]);
  const [individuals, setIndividuals] = useState([]);
  const [sightings, setSightings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // fetchinig the data
        const fetchSpecies = await fetch('http://localhost:5000/species');
        const fetchIndividuals = await fetch('http://localhost:5000/individuals');
        const fetchSightings = await fetch('http://localhost:5000/sightings');

        const speciesData = await fetchSpecies.json();
        const individualsData = await fetchIndividuals.json();
        const sightingsData = await fetchSightings.json();

        setSpecies(speciesData);
        setIndividuals(individualsData);
        console.log(setSightings(sightingsData));
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading animals...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      {/* Species section */}
      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-6 underline">Species</h2>
        <SpeciesCard species={species} />
      </section>

      {/* Individuals section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 underline">Individuals</h2>
        <IndividualCard individuals={individuals} />
      </section>

      {/* Sightings section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 underline">Sightings</h2>
        <SightingCard sightings={sightings} />
      </section>
    </div>
  );
}

export default DisplayEndangeredAnimals;
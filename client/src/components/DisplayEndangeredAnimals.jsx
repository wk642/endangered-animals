import React, { useState, useEffect } from 'react';
import SpeciesCard from './SpeciesCard';
import IndividualCard from './IndividualCard';
import SightingCard from './SightingCard';
import AddSpeciesForm from './AddSpeciesForm';
import AddIndividualForm from './AddIndividualForm';

function DisplayEndangeredAnimals() {
  // set states
  const [species, setSpecies] = useState([]);
  const [individuals, setIndividuals] = useState([]);
  const [sightings, setSightings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddSpeciesForm, setShowAddSpeciesForm] = useState(false);
  const [showAddIndividualForm, setShowAddIndividualForm] = useState(false);

  // handling the forms being shown or not.
  // Add species
  const toggleAddSpeciesForm = () => {
    setShowAddSpeciesForm(!showAddSpeciesForm);
  };

  // Add individual
  const toggleAddIndividualForm = () => {
    setShowAddIndividualForm(!showAddIndividualForm);
  };
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

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading animals...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  // handle the add species 
  const handleSpeciesAdded = () => {
    // refresh the page automatically update and display
    fetchData();
    setShowAddSpeciesForm(false);
  };

  // handle the add species 
    const handleIndividualAdded = () => {
    // not reloading and displaying , so checking ot make sure it is getting here
     console.log('handleIndividualAdded called'); 
    // refresh the page automatically update and display
    fetchData();
    setShowAddIndividualForm(false);
  };

  // handle deleting species
  const handleDeleteSpecies = async (deleteSpeciesId) => {
    try {
      const response = await fetch(`http://localhost:5000/species/${deleteSpeciesId}`, {
        method: 'DELETE',
      });

      // if (!response.ok) {
      //   throw new Error('Failed to delete species');
      // }

      const data = await response.json();
      console.log(data.message);
      fetchData();
    } catch (error) {
      console.error('Error deleting species:', error);
    }
  };

  return (
    <div>
      {/* Button to Add Species Form */}
      <button
        onClick={toggleAddSpeciesForm}
        className="bg-sky-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      > Add Species</button>

      {/* Species Form (conditionally rendered) */}
      {showAddSpeciesForm && <AddSpeciesForm speciesAdded={handleSpeciesAdded} />}

      {/* Button to Add Individual Form */}
      <button
        onClick={toggleAddIndividualForm}
        className="bg-sky-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      > Add Individual</button>

      {/* Species Form (conditionally rendered) */}
      {showAddIndividualForm && <AddIndividualForm individualAdded={handleIndividualAdded}/>}

      {/* Species section */}
      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-6 underline">Species</h2>
        <SpeciesCard species={species} speciesDeleted={handleDeleteSpecies} />
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
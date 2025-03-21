import React, { useState, useEffect } from 'react';

function AddIndividualForm({ individualAdded }) {
  const [individualNickname, setIndividualNickname] = useState('');
  const [selectedSpeciesName, setSelectedSpeciesName] = useState('');
  const [speciesList, setSpeciesList] = useState([]);

  useEffect(() => {
    async function fetchSpecies() {
      try {
        const response = await fetch('http://localhost:5000/species');
        const speciesData = await response.json();
        setSpeciesList(speciesData);
      } catch (error) {
        console.error('Error fetching species:', error);
      }
    }

    fetchSpecies();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const selectedSpecies = speciesList.find(
        (species) => species.common_name === selectedSpeciesName
      );

      // see what is being returned, maybe this is why it's not working
      console.log("Selected Species:", selectedSpecies);

      if (!selectedSpecies) {
        alert('Please select a species.');
        return;
      }

      console.log("Submitting:", {
        individual_nickname: individualNickname,
        species_id: selectedSpecies.species_id,
      });

      const response = await fetch('http://localhost:5000/individuals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          individual_nickname: individualNickname,
          species_id: selectedSpecies.species_id,
        }),
      });

      console.log("Response:", response); 

      if (response.ok) {
        alert('Individual added successfully!');
        setIndividualNickname('');
        setSelectedSpeciesName('');
        individualAdded();  
      } else {
        alert('Failed to add individual.');
      }
    } catch (error) {
      console.error('Error adding individual:', error);
      alert('An error occurred.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Nickname:</label>
        <input
          type="text"
          value={individualNickname}
          onChange={(e) => setIndividualNickname(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Species:</label>
        <select
          value={selectedSpeciesName}
          onChange={(e) => setSelectedSpeciesName(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        >
          <option value="">Select Species</option>
          {speciesList.map((species) => (
            <option key={species.species_id} value={species.common_name}>
              {species.common_name}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Add Individual
      </button>
    </form>
  );
}

export default AddIndividualForm;
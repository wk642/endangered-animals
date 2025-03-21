import React, { useState, useEffect } from 'react';

function AddIndividualForm({ individualAdded }) {
  // setting the states
  const [individualNickname, setIndividualNickname] = useState('');
  const [selectedSpeciesId, setSelectedSpeciesId] = useState('');
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
        (species) => species.id === selectedSpeciesId
      );

      // see what is being returned, maybe this is why it's not working
      console.log("Selected Species:", selectedSpecies);

      if (!selectedSpecies) {
        alert('Please select a species.');
        return;
      }
      var newIndividual = {individual_nickname: individualNickname,
      species_id: selectedSpecies.id};

      // see what is going through
      console.log("Submitting:", newIndividual);

      const response = await fetch('http://localhost:5000/individuals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newIndividual),
      });

      console.log("Response:", response); 

      if (response.ok) {
        alert('Individual added successfully!');
        setIndividualNickname('');
        setSelectedSpeciesId('');
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
        <label htmlFor="nicknameInput" className="block text-gray-700 text-sm font-bold mb-2">Nickname:</label>
        <input
          id="nicknameInput"
          type="text"
          value={individualNickname}
          onChange={(e) => setIndividualNickname(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="speciesSelect" className="block text-gray-700 text-sm font-bold mb-2">Species:</label>
        <select
          id="speciesSelect"
          value={selectedSpeciesId}
          onChange={(e) => setSelectedSpeciesId(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        >
          <option value="">Select Species</option>
          {speciesList.map((species) => (
            <option key={species.id} value={species.id}>
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
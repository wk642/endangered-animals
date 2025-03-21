import React, { useState } from 'react';

function AddSpeciesForm({ speciesAdded }) {
  const [commonName, setCommonName] = useState('');
  const [scientificName, setScientificName] = useState('');
  const [speciesPopulation, setSpeciesPopulation] = useState('');
  const [conservationCode, setConservationCode] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/species', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          common_name: commonName,
          scientific_name: scientificName,
          species_population: speciesPopulation,
          conservation_code: conservationCode,
        }),
      });

      if (response.ok) {
        alert('Species added successfully!');
        //reset the form
        setCommonName('');
        setScientificName('');
        setSpeciesPopulation('');
        setConservationCode('');
        speciesAdded();
      } else {
        alert('Failed to add species.');
      }
    } catch (error) {
      console.error('Error adding species:', error);
      alert('An error occurred.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Common Name:</label>
        <input
          type="text"
          value={commonName}
          onChange={(e) => setCommonName(e.target.value)}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Scientific Name:</label>
        <input
          type="text"
          value={scientificName}
          onChange={(e) => setScientificName(e.target.value)}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Species Population:</label>
        <input
          type="number"
          value={speciesPopulation}
          onChange={(e) => setSpeciesPopulation(e.target.value)}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Conservation Code:</label>
        <input
          type="text"
          value={conservationCode}
          onChange={(e) => setConservationCode(e.target.value)}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Add Species
      </button>
    </form>
  );
}

export default AddSpeciesForm;
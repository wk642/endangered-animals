import React, { useState, useEffect } from 'react';

function AddSightingForm({ sightingAdded }) {
  // setting the states
  const [sightingDateTime, setSightingDateTime] = useState('');
  const [sightedAnimalId, setSightedAnimalId] = useState('');
  const [animalHealth, setAnimalHealth] = useState(true);
  const [sighterEmail, setSighterEmail] = useState('');
  const [sightedLocation, setSightedLocation] = useState('');
  const [individualsList, setIndividualsList] = useState([]);

  useEffect(() => {
    async function fetchIndividuals() {
      try {
        const response = await fetch('http://localhost:5000/individuals');
        const individualsData = await response.json();
        setIndividualsList(individualsData);
      } catch (error) {
        console.error('Error fetching individuals:', error);
      }
    }

    fetchIndividuals();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/sightings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sighting_date_time: sightingDateTime,
          sighted_animal_id: sightedAnimalId,
          animal_health: animalHealth,
          sighter_email: sighterEmail,
          sighted_location: sightedLocation,
        }),
      });
    
      // reset form and update the data
      if (response.ok) {
        alert('Sighting added successfully!');
        setSightingDateTime('');
        setSightedAnimalId('');
        setAnimalHealth(true);
        setSighterEmail('');
        setSightedLocation('');
        sightingAdded();
      } else {
        alert('Failed to add sighting.');
      }
    } catch (error) {
      console.error('Error adding sighting:', error);
      alert('An error occurred.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Date/Time:</label>
        <input
          type="datetime-local"
          value={sightingDateTime}
          onChange={(e) => setSightingDateTime(e.target.value)}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Animal:</label>
        <select
          value={sightedAnimalId}
          onChange={(e) => setSightedAnimalId(e.target.value)}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Select Individual</option>
          {individualsList.map((individual) => (
            <option key={individual.id} value={individual.id}>
              {individual.individual_nickname}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Health:</label>
        <select
          value={animalHealth}
          onChange={(e) => setAnimalHealth(e.target.value === 'true')}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value={true}>Healthy</option>
          <option value={false}>Not Healthy</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Sighter Email:</label>
        <input
          type="email"
          value={sighterEmail}
          onChange={(e) => setSighterEmail(e.target.value)}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Location:</label>
        <input
          type="text"
          value={sightedLocation}
          onChange={(e) => setSightedLocation(e.target.value)}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Add Sighting
      </button>
    </form>
  );
}

export default AddSightingForm;
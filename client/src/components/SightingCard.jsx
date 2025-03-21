import React from 'react';

function SightingCard({ sightings }) {
  //Displaying all the sightings
  // animal name would be a join
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {sightings.map((sighting) => (
        <div key={sighting.id} className="relative bg-green-300 rounded-lg p-4">
           {/* Add delete button for every card */}
           <button
            onClick={() => {
              if (onDelete) {
                onDelete(individual.id);
              }
            }}
            className="absolute top-2 right-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs"
          >
            Delete
          </button>
          <p><span className="font-bold">Date/Time:</span> {sighting.sighting_date_time}</p>
          <p><span className="font-bold">Animal:</span> {sighting.individual_nickname}</p>
          <p><span className="font-bold">Sighted Location:</span> {sighting.sighted_location}</p>
          <p><span className="font-bold">Health:</span> {sighting.animal_health ? 'Healthy' : 'Not Healthy'}</p>
          <p><span className="font-bold">Email:</span> {sighting.sighter_email}</p>
          <p><span className="font-bold">Sighting Created At:</span> {sighting.created_at}</p>
        </div>
      ))}
    </div>
  );
}

export default SightingCard;
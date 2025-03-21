import React from 'react';

function IndividualCards({ individuals }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Display each individual animal  */}
      {individuals.map((individual) => (
        <div key={individual.id} className="relative bg-yellow-300 rounded-lg p-4">
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
          <h3 className="text-lg font-semibold mb-2">{individual.individual_nickname}</h3>
          {/* JOIN for the species name to be displayed */}
          <p><span className="underline font-bold">Species:</span>  {individual.common_name}</p>
          <p><span className="underline font-bold">Species ID:</span> {individual.species_id}</p>
          <p><span className="underline font-bold">Created At:</span> {individual.created_at}</p>
        </div>
      ))}
    </div>
  );
}

export default IndividualCards;

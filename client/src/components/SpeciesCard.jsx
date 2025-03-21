import React from 'react';

function SpeciesCards({ species }) {
  return (
    <div className="text-left grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {species.map((species) => (
        <div key={species.id} className="relative bg-sky-500 rounded-lg p-4">
           {/* Add delete button for every card */}
           <button
            onClick={() => {
              if (onDelete) {
                onDelete(species.id);
              }
            }}
            className="absolute top-2 right-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs"
          >
            Delete
          </button>
          <h3 className="text-lg font-bold mb-2">{species.common_name}</h3>
          <p><span className="underline font-bold">ID</span> {species.id}</p>
          <p><span className="underline font-bold">Scientific Name:</span> {species.scientific_name}</p>
          <p><span className="underline font-bold">Population:</span> {species.species_population}</p>
          <p><span className="underline font-bold">Conservation Code:</span> {species.conservation_code}</p>
          <p><span className="underline font-bold">Created At:</span> {species.created_at}</p>
        </div>
      ))}
    </div>
  );
}

export default SpeciesCards;


import React from 'react';

function SpeciesCards({ species }) {
  return (
    <div className="text-left grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {species.map((species) => (
        <div key={species.id} className="bg-sky-500 rounded-lg p-4">
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


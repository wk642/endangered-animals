import { useState } from 'react'
import './App.css'
import DisplayEndangeredAnimals from './components/DisplayEndangeredAnimals';

function App() {
  
  return (
    <div className="container p-4">
      <h1 className="text-right text-blue-300 text-3xl">
        ENDANGERED SPEICES SIGHTINGS TRACKER
      </h1>
      <DisplayEndangeredAnimals />
    </div>
  )
}

export default App;

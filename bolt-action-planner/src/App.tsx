//import { useState } from 'react'
import './App.css'
import ArmyBuilder from './components/ArmyBuilder.tsx'
import type { Nation } from './types/army'

// Sample data - you'll want to expand this significantly
const sampleNations: Nation[] = [
  {
    id: '1',
    name: 'United States',
    availableUnits: [
      {
        id: 'us1',
        name: 'Regular Infantry Squad',
        type: 'Infantry',
        cost: 100,
        experience: 'Regular',
        equipment: ['Rifles', 'SMG', 'BAR'],
        specialRules: ['Fire and Maneuver']
      },
      {
        id: 'us2',
        name: 'Sherman Tank',
        type: 'Vehicle',
        cost: 195,
        experience: 'Regular',
        equipment: ['75mm gun', '.30 cal MG'],
        specialRules: ['Heavy Armor']
      }
    ]
  },
  {
    id: '2',
    name: 'Germany',
    availableUnits: [
      {
        id: 'ger1',
        name: 'Veteran Grenadiers',
        type: 'Infantry',
        cost: 130,
        experience: 'Veteran',
        equipment: ['Rifles', 'MG42'],
        specialRules: ['Stubborn']
      }
    ]
  }
];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Bolt Action Army Planner</h1>
      </header>
      <main>
        <ArmyBuilder nations={sampleNations} />
      </main>
    </div>
  )
}

export default App
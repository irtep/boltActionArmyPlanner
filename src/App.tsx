//import { useState } from 'react'
import './App.css'
import { armiesOfNation } from './armies/armies.ts'
import ArmyBuilder from './components/ArmyBuilder.tsx'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Bolt Action Army Planner</h1>
      </header>
      <main>
        <ArmyBuilder nations={armiesOfNation} />
      </main>
    </div>
  )
}

export default App
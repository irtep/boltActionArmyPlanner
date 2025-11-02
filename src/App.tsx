import { useState } from 'react'
import './App.css'
import { armiesOfNation } from './armies/armies.ts';
import ArmyBuilder, { type ArmyListWithUnits } from './components/ArmyBuilder.tsx'
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login.tsx';
import Register from './components/Register.tsx';
import NotFound from './components/NotFound.tsx';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import type { Nation } from './types/army.ts';

const defaultArmy: ArmyListWithUnits = {
  id: '1',
  userId: '',
  name: 'My Army',
  nation: '',
  pointsLimit: 1000,
  units: [],
  totalPoints: 0
};

function App() {
  const [userId, setUserId] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [selectedNation, setSelectedNation] = useState<Nation | null>(null);
  const [army, setArmy] = useState<ArmyListWithUnits>(defaultArmy);
  const modeOfUse: 'dev'|'prod' = 'prod'; // change this if building to prod or using in dev mode

  const logUserOut = () => {
    setUserId('');
    setToken('');
    setUsername('');
    setArmy(defaultArmy);
    setSelectedNation(null);
  }

  return (
    <div className="App">
      <Header
        username={username}
        logUserOut={logUserOut}
      />
      <Routes>
        <Route path="/" element={<ArmyBuilder
          username={username}
          userId={userId}
          modeOfUse={modeOfUse}
          nations={armiesOfNation}
          selectedNation={selectedNation}
          setSelectedNation={setSelectedNation}
          army={army}
          setArmy={setArmy}
          token={token}
        />} />
        <Route path="/login" element={<Login
          setUserId={setUserId}
          setToken={setToken}
          setUsername={setUsername}
          modeOfUse={modeOfUse}
        />} />
        <Route path="/register" element={<Register
          modeOfUse={modeOfUse}
        />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App
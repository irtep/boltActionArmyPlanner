import { useState } from 'react'
import './App.css'
import { armiesOfNation } from './armies/armies.ts'
import ArmyBuilder from './components/ArmyBuilder.tsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login.tsx';
import Register from './components/Register.tsx';
import NotFound from './components/NotFound.tsx';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';

function App() {
  const [token, setToken] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  //const [admin, setAdmin] = useState<boolean>(false);
  const [modeOfUse, setModeOfUse] = useState<'dev' | 'prod'>('dev');
  const [message, setMessage] = useState<string>('');

  const logUserOut = () => {
    setToken('');
    setUsername('');
  }

  console.log('X ', token);
  setModeOfUse('dev');
  setMessage('');

  return (
    <div className="App">

      <Router>
        <Header
          username={username}
          logUserOut={logUserOut}
          message={message}
        />
        <Routes>
          <Route path="/" element={<ArmyBuilder nations={armiesOfNation} />} />
          <Route path="/login" element={<Login
            setToken={setToken}
            setUsername={setUsername}
            //setAdmin={setAdmin}
            modeOfUse={modeOfUse}
          />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>

      <Footer />

    </div>
  )
}

export default App
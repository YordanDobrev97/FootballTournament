import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import { useCookies } from 'react-cookie'

import Navbar from './components/Navbar/index'
import Home from './pages/Home/index'
import Login from './pages/Auth/login'
import Register from './pages/Auth/register'
import Tournament from './pages/Tournament'
import AuthContext from './context/AuthContext'

import './App.css'

function App() {
  const [cookies] = useCookies(['jwt'])
  const [isAuthenticated, setAuthenticated] = useState(cookies?.jwt || false)
  
  return (
    <div className="App">
      <AuthContext.Provider value={{ isAuthenticated, setAuthenticated }}>
        <Router>
          <Navbar />

          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/tournaments' element={<Tournament />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;

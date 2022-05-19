import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet
} from 'react-router-dom'
import { useCookies } from 'react-cookie'

import Layout from './components/Layout'
import Navbar from './components/Navbar/index'
import Home from './pages/Home/index'
import Login from './pages/Auth/login'
import Register from './pages/Auth/register'
import LayoutTournament from './pages/Tournament/layoutTournament'
import Tournament from './pages/Tournament'
import CreateTournament from './pages/Tournament/create'
import AuthContext from './context/AuthContext'

import './App.css'

function App() {
  const [cookies] = useCookies(['jwt'])
  const [isAuthenticated, setAuthenticated] = useState(cookies?.jwt || false)

  return (
    <div className="App">
      <AuthContext.Provider value={{ isAuthenticated, setAuthenticated }}>
        <Router>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route path='home' element={<Home />}/>
              <Route path='login' element={<Login />} />
              <Route path='register' element={<Register />} />
              <Route path='tournaments' element={<LayoutTournament />}>
                <Route path='all' element={<Tournament />} />
                <Route path='create' element={<CreateTournament />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;

import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import { useCookies } from 'react-cookie'

import Layout from './components/Layout'
import Home from './pages/Home/index'
import Login from './pages/Auth/login'
import Register from './pages/Auth/register'
import LayoutTournament from './pages/Tournament/layoutTournament'
import Tournament from './pages/Tournament'
import CreateTournament from './pages/Tournament/create'
import Team from './pages/Team/index'
import LayoutTeam from './pages/Team/layoutTeam'
import NewTeam from './pages/Team/newTeam'
import StatisticsLayout from './pages/Statistics/statisticsLayout'
import Statistics from './pages/Statistics'

import AdminLayout from './components/Layout/adminLayout'
import Administration from './pages/Administration'
import UserLayout from './components/User/userLayout'
import Users from './components/User'
import AddToTeam from './components/User/addToTeam'
import TeamLayout from './components/Team/teamLayout'
import AllTeams from './components/Team'
import Edit from './components/Team/edit'
import TournamentLayout from './components/Tournament/tournamentLayout'
import Tournaments from './components/Tournament'
import GetById from './components/Tournament/getById'
import AddToTournament from './components/Team/addToTournament'
import AuthContext from './context/AuthContext'

import './App.css'

function App() {
  const [cookies] = useCookies(['jwt'])
  const [isAuthenticated, setAuthenticated] = useState(cookies?.jwt || false)

  return (
    <div className='App'>
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
              <Route path='teams' element={<LayoutTeam />}>
                <Route path='all' element={<Team />}/>
                <Route path='new' element={<NewTeam />}/>
              </Route>
              <Route path='statistics' element={<StatisticsLayout />}>
                <Route path='index' element={<Statistics />}/>
              </Route>
            </Route>
            
            <Route path='administration' element={<AdminLayout />}>
              <Route path='home' element={<Administration />}/>

              <Route path='users' element={<UserLayout />}>
                <Route path='all' element={<Users />}/>
                <Route path=':userId' element={<AddToTeam />}/>

              </Route>

              <Route path='teams' element={<TeamLayout />}>
                <Route path='all' element={<AllTeams />}/>
                <Route path=':id' element={<Edit />}/>
                <Route path='addToTournament' element={<TeamLayout />}>
                  <Route path=':teamId' element={<AddToTournament />}/>
                </Route>
              </Route>

              <Route path='tournaments' element={<TournamentLayout />}>
                <Route path='all' element={<Tournaments />}/>
                <Route path=':id' element={<GetById />}/>
              </Route>
            </Route>
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;

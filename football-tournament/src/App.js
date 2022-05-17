import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/index';

import Home from './pages/Home/index'
import Login from './pages/Auth/login'
import Register from './pages/Auth/register'

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />

        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />}/>

        </Routes>
      </Router>
    </div>
  );
}

export default App;

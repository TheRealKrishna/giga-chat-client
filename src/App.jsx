
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path = "/" element={<><Navbar/><Home/></>}/>
        <Route exact path = "/auth/login" element={<><Login/></>}/>
        <Route exact path = "/auth/signup" element={<><Signup/><Home/></>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

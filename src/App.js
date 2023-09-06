
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Footer from './components/Footer';
import ChatPage from './pages/dashboard/ChatPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path = "/" element={<><Navbar/><Home/><Footer/></>}/>
        <Route exact path = "/auth/login" element={<><Login/></>}/>
        <Route exact path = "/auth/signup" element={<><Signup/></>}/>
        <Route exact path = "/dashboard" element={<><ChatPage/></>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

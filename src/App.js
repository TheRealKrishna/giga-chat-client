import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Footer from './components/Footer';
import ChatPage from './pages/chat/ChatPage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
      <Routes>
        <Route exact path = "/" element={<><Navbar/><Home/><Footer/></>}/>
        <Route exact path = "/auth/login" element={<><Login/></>}/>
        <Route exact path = "/auth/signup" element={<><Signup/></>}/>
        <Route exact path = "/chat" element={<><ChatPage/></>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

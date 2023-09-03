import React from 'react'
import { Link } from 'react-router-dom'
import "../css/Navbar.css"

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg">
    <div className="container-fluid">
        <Link className="navbar-brand" style={{fontFamily:"cursive", fontWeight:"bold"}} to="/">Giga Chat</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
        <ul className="navbar-nav">
            <li className="nav-item">
            <Link to="/auth/login"><button className="btn loginButton" aria-current="page">Login</button></Link>
            <Link to="/auth/signup"><button className="btn signupButton" aria-current="page">Signup</button></Link>
            {/* <button className="btn logoutButton" aria-current="page">Logout</button> */}
            </li>
        </ul>
        </div>
    </div>
    </nav>
  )
}

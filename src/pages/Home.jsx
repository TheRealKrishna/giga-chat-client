import React, { Fragment, useState } from 'react'
import Styles from "../css/Home.module.css"
import manConversation from "../images/man-conversation.png"
import Typewriter from 'typewriter-effect';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("auth-token"))
  
  const handleLogout = ()=>{
    localStorage.removeItem("auth-token");
    setLoggedIn(false)
    toast.error("Logged out successfully.")
  }

  return (
    <>
    <div className={Styles.blueCirclesBackground} />
    <div className='container text-center mt-5 text-white'>
      <h1 className={Styles.title}>Giga Chat</h1>
      <img src={manConversation} alt="" className='mt-4' style={{maxWidth:"100%"}} />
      <h2 className='mt-4'>
      <Typewriter
        options={{
          strings: ['Join The World Of Chads...', 'Chat With Other Chads...', 'No Normies Allowed Here...'],
          autoStart: true,
          loop: true,
          delay:100,
          pauseFor:2000,
        }}
        />
      </h2>
      </div>
      <div className={`${Styles.buttonContainer} d-flex justify-content-center`}>
      {
        loggedIn
        ? 
        <Fragment>
        <Link to="/chat"><button className={`btn ${Styles.dashboardButton}`} aria-current="page"><i className="fa-solid fa-message" style={{color: "#000000"}}></i> Chat</button></Link>
        <button onClick={handleLogout} className={`btn ${Styles.logoutButton}`} aria-current="page"><i className="fa-solid fa-power-off" style={{color: "#000000"}}></i> Logout</button>
        </Fragment>
        :
        <Fragment>
          <Link to="/auth/login"><button className={`btn ${Styles.loginButton}`} aria-current="page"><i className="fa-solid fa-right-to-bracket" style={{color: "#000000"}}></i> Login</button></Link>
          <Link to="/auth/signup"><button className={`btn ${Styles.signupButton}`} aria-current="page"><i className="fa-solid fa-user-plus" style={{color: "#000000"}}></i> Signup</button></Link>
        </Fragment>
      }
      </div>
      <div className={`container ${Styles.statistics}`}>
        <div className={`${Styles.numberOfUsers} ${Styles.statisticsItem}`}>
        <i className="fa-solid fa-user-ninja icons" style={{color: "#000000"}}></i>
        <h2>800+</h2>
        <h3>Chads Joined...</h3>
        </div>
        <div className={`${Styles.numberOfMessages} ${Styles.statisticsItem}`}>
        <i className="fa-solid fa-comments" style={{color: "#000000"}}></i>
        <h2>98000+</h2>
        <h3>Messages Sent...</h3>
        </div>
        <div className={`${Styles.numberOfUsersBanned} ${Styles.statisticsItem}`}>
        <i className="fa-solid fa-skull" style={{color: "#000000"}}></i>
          <h2>200+</h2>
          <h3>Normies Banned...</h3>
        </div>
      </div>
    </>
  )
}

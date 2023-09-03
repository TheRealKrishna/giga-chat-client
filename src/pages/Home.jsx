import React from 'react'
import "../css/Home.css"
import manConversation from "../images/man-conversation.png"
import Typewriter from 'typewriter-effect';

export default function Home() {
  return (
    <>
    <div className='blueCirclesBackground' />
    <div className='container text-center mt-5 text-white'>
      <h1 className='title'>Giga Chat</h1>
      <img src={manConversation} alt="" />
      <h2>
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
    </>
  )
}

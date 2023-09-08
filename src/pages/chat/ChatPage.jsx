import React from 'react'
import Styles from "../../css/ChatPage.module.css"
import { Link } from "react-router-dom"
export default function ChatPage() {
  return (
    <div>
      <div className={Styles.blueCirclesBackground}></div>
      <div className={Styles.navbar}>
        <Link to="/"><h4 className={Styles.title}>Giga Chat</h4></Link>
        <div className={Styles.currentUser}>
          <img src="https://ih1.redbubble.net/image.2852009442.7031/flat,750x,075,f-pad,750x1000,f8f8f8.jpg" alt="userProfile" />
          <span>Name</span>
        </div>
        <div className={Styles.settingsIcon}>
          <i className={`fa-solid fa-gear`}></i>
        </div>
      </div>
      <div className='d-flex'>
        <div className={Styles.contactsArea}>
          <form action='' className={Styles.contactSearch}>
            <input type="text" placeholder='search...' className={Styles.contactSearchInput} />
            <button type='submit' className={`${Styles.contactSearchButton} btn`}><i class="fa-solid fa-magnifying-glass"></i></button>
          </form>
          <div className={Styles.contactItem}><img className={Styles.contactItemImage} src="https://ih1.redbubble.net/image.2852009442.7031/flat,750x,075,f-pad,750x1000,f8f8f8.jpg" alt="userProfile" /><span className={Styles.contactItemName}>Name</span></div>
          <div className={Styles.contactItem}><img className={Styles.contactItemImage} src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png" alt="userProfile" /><span className={Styles.contactItemName}>Name</span></div>
          <div className={Styles.contactItem}><img className={Styles.contactItemImage} src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png" alt="userProfile" /><span className={Styles.contactItemName}>Name</span></div>
        </div>
        <div className={Styles.chatArea}>
          <div className={Styles.leftChat}><span className={Styles.incomingChat}>Hello, How are you?</span></div>
          <div className={Styles.rightChat}><span className={Styles.outgoingChat}>I am fine, What about you?</span></div>
          <form action="" className={Styles.sendMessage}>
            <div className={Styles.sendMessageBox}>
              <div className={Styles.sendMessageemojiSelector}><i class="fa-regular fa-face-smile"></i></div>
              <div className={Styles.attachmentSelector}><i class="fa-solid fa-paperclip"></i></div>
              <input type="text" className={Styles.sendMessageInput} placeholder='say something...'></input>
              <button type='submit' className={`${Styles.sendMessage} btn`}><i class="fa-solid fa-circle-arrow-right"></i></button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

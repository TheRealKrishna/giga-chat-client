import React from 'react'
import Styles from "../css/Settings.module.css";
import { Link } from 'react-router-dom';

export default function Settings() {
  return (
    <div>
      <div className={Styles.blueCirclesBackground}></div>
      <div className={Styles.navbar}>
        <Link to="/"><h4 className={Styles.title}>Giga Chat</h4></Link>
        <div className={Styles.currentUser}></div>
        <Link className={Styles.settingsIcon} to={"/chat"}>
          <i className={`fa-solid fa-arrow-left`}></i>
        </Link>
      </div>
    </div>
  )
}

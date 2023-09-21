import React from 'react'
import Styles from "../css/Loader.module.css"

export default function Loader() {
    return (
        <div className={`container ${Styles.Loader}`}>
            <div className={Styles.ldsRipple}><div></div><div></div></div>
        </div>
    )
}

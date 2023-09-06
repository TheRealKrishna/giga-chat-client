import React, { useState } from 'react'
import Styles from "../../css/Signup.module.css";
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import gigaChadLogo from "../../images/gigaChadLogo2.png"

export default function Signup() {
  const [passwordVisibility, setPasswordVisibility] = useState(false)
  const [passwordType, setPasswordType] = useState("password")
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const handlePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
    setPasswordType(passwordType === "password" ? "text" : "password")
  }

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={Styles.signupBackground}>
        <div className={Styles.signupContainer}>
        <Link to="/"><img src={gigaChadLogo} alt="gigaChadLogo" style={{maxWidth:"100%", maxHeight:'100px', margin:"20px"}} /></Link>
          <div className={Styles.signUpAndLoginButtonContainer}>
            <Link to="/auth/login" style={{ textDecoration: "none" }} className={`container ${Styles.loginButton}`}>Login</Link>
            <Link to="/auth/signup" style={{ textDecoration: "none" }} className={`container ${Styles.signupButton}`}>SignUp</Link>
          </div>
          <div className="container d-flex flex-column align-items-center">
            <h2 style={{ fontFamily: "arial", margin: '40px', fontWeight: "bolder" }}>Sign Up</h2>
            <div className={Styles.usernameBox}>
              <i class={`${Styles.signupInputIcons} fa-regular fa-user `} style={{ color: "#000000" }}></i><input type="text" name="username" minLength={8} required {...register("username")} placeholder='Username' className={Styles.signupInput} />
            </div>
            <div className={Styles.emailBox}>
              <i class={`${Styles.signupInputIcons} fa-regular fa-envelope `} style={{ color: "#000000" }}></i><input type="email" placeholder='Email' name="email" required {...register("email")} className={Styles.signupInput} />
            </div>
            <div className={Styles.passwordBox}>
              <i class={`${Styles.signupInputIcons} fa-solid fa-lock`} style={{ color: "#000000" }}></i><input type={passwordType} name="password"
                {...register("password")} minLength={8} placeholder='Password' className={Styles.signupInput} required /><i class={`${Styles.signupInputIcons} fa-solid ${passwordVisibility ? "fa-eye-slash" : "fa-eye"}`} style={{ color: "#000000", cursor: "pointer" }} onClick={handlePasswordVisibility}></i>
            </div>
          </div>
          <button className="btn btn-primary rounded-pill mt-4  " type="submit">Create Account</button>
        </div>
      </div>
    </form>
  )
}

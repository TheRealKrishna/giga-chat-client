import React, { useEffect, useState } from 'react'
import Styles from "../../css/Signup.module.css";
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import gigaChadLogo from "../../images/gigaChadLogo2.png"
import { toast } from 'react-toastify';

export default function Signup() {
  const [passwordVisibility, setPasswordVisibility] = useState(false)
  const [passwordType, setPasswordType] = useState("password")
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
  } = useForm();
  const handlePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
    setPasswordType(passwordType === "password" ? "text" : "password")
  }

  const onSubmit = (data) => {
    toast.promise(new Promise(async (resolve, reject) => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/signup`, {
        method: "post",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      })
      const json = await response.json();
      if (json.success) {
        localStorage.setItem("auth-token", json.authToken)
        navigate("/dashboard")
        resolve();
      }
      else {
        reject(json.error)
      }
    }),
      {
        pending: 'Creating account...',
        success: 'Account successfully created. ',
        error: {
          render({ data }) {
            return data
          }
        }
      }
    )
  };

  useEffect(()=>{
    if(localStorage.getItem("auth-token")) {
      navigate("/dashboard");
    }
  })

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={Styles.signupBackground}>
          <div className={Styles.signupContainer}>
            <Link to="/"><img src={gigaChadLogo} alt="gigaChadLogo" style={{ maxWidth: "100%", maxHeight: '100px', margin: "20px" }} /></Link>
            <div className={Styles.signUpAndLoginButtonContainer}>
              <Link to="/auth/login" style={{ textDecoration: "none" }} className={`container ${Styles.loginButton}`}>Login</Link>
              <Link to="/auth/signup" style={{ textDecoration: "none" }} className={`container ${Styles.signupButton}`}>SignUp</Link>
            </div>
            <div className="container d-flex flex-column align-items-center">
              <h2 style={{ fontFamily: "arial", margin: '40px', fontWeight: "bolder" }}>Sign Up</h2>
              <div className={Styles.usernameBox}>
                <i className={`${Styles.signupInputIcons} fa-regular fa-user `} style={{ color: "#000000" }}></i><input type="text" name="username" required {...register("username")} minLength={5} placeholder='Username' className={Styles.signupInput} />
              </div>
              <div className={Styles.emailBox}>
                <i className={`${Styles.signupInputIcons} fa-regular fa-envelope `} style={{ color: "#000000" }}></i><input type="email" placeholder='Email' name="email" required {...register("email")} className={Styles.signupInput} />
              </div>
              <div className={Styles.passwordBox}>
                <i className={`${Styles.signupInputIcons} fa-solid fa-lock`} style={{ color: "#000000" }}></i><input type={passwordType} name="password"
                  {...register("password")} minLength={8} placeholder='Password' className={Styles.signupInput} required /><i className={`${Styles.signupInputIcons} fa-solid ${passwordVisibility ? "fa-eye-slash" : "fa-eye"}`} style={{ color: "#000000", cursor: "pointer" }} onClick={handlePasswordVisibility}></i>
              </div>
            </div>
            <button className="btn btn-primary rounded-pill mt-4  " type="submit">Create Account</button>
          </div>
        </div>
      </form>
      )
    }


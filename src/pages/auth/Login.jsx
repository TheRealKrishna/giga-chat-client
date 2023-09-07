import React, { useEffect, useState } from 'react'
import Styles from "../../css/Login.module.css";
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import gigaChadLogo from "../../images/gigaChadLogo.png"
import { toast } from 'react-toastify';

export default function Login() {
  const [passwordVisibility, setPasswordVisibility] = useState(false)
  const [passwordType, setPasswordType] = useState("password")
  const navigate = useNavigate();
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
    toast.promise(new Promise(async (resolve, reject) => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
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
        pending: 'Logging in...',
        success: 'Logged in successfully.',
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
      <div className={Styles.loginBackground}>
        <div className={Styles.loginContainer}>
          <Link to="/"><img src={gigaChadLogo} alt="gigaChadLogo" style={{maxWidth:"100%", maxHeight:'100px', margin:"20px"}} /></Link>
          <div className={Styles.loginAndLoginButtonContainer}>
            <Link to="/auth/login" style={{ textDecoration: "none" }} className={`container ${Styles.loginButton}`}>Login</Link>
            <Link to="/auth/signup" style={{ textDecoration: "none" }} className={`container ${Styles.signupButton}`}>SignUp</Link>
          </div>
          <div className="container d-flex flex-column align-items-center">
            <h2 style={{ fontFamily: "arial", margin: '40px', fontWeight: "bolder" }}>Login</h2>
            <div className={Styles.usernameBox}>
              <i class={`${Styles.loginInputIcons} fa-regular fa-user `} style={{ color: "#000000" }}></i><input type="text" name="username" required {...register("username")} placeholder='Username or Email' className={Styles.loginInput} />
            </div>
            <div className={Styles.passwordBox}>
              <i class={`${Styles.loginInputIcons} fa-solid fa-lock`} style={{ color: "#000000" }}></i><input type={passwordType} name="password"
                {...register("password")} minLength={8} placeholder='Password' className={Styles.loginInput} required /><i class={`${Styles.loginInputIcons} fa-solid ${passwordVisibility ? "fa-eye-slash" : "fa-eye"}`} style={{ color: "#000000", cursor: "pointer" }} onClick={handlePasswordVisibility}></i>
            </div>
          </div>
          <button className="btn btn-primary rounded-pill mt-4" style={{padding:"5px 40px"}} type="submit">Login</button>
        </div>
      </div>
    </form>
  )
}

"use client";
//----------- React/Next ----------------------------------------------------------------//
import { useState } from "react";
//----------- Contexts ----------------------------------------------------------------//
import { useThemeContext } from "../contexts/ThemeContext";
//----------- SVGs ----------------------------------------------------------------//
import BlackBg from "../SVGs/BlackBg";
import { LightBg } from "../SVGs/LightBg";
import LoginIcon from "../SVGs/LoginIcon";
import SignUpIcon from "../SVGs/SignUpIcon";
//----------- Components ----------------------------------------------------------//
import Login from "./Login";
import SignUp from "./SignUp";
import DarkModeBtn from "../components/buttons/DarkModeBtn";
import { useUserContext } from "../contexts/UserContext";
import { BiMessageSquareError } from "react-icons/bi";

const Register = () => {
  const { theme, setTheme } = useThemeContext(),
    { state, signupState } = useUserContext(),
    [loginScreen, setLoginScreen] = useState(true);

  const signUp = () => {
    setLoginScreen(false);
  };
  const logIn = () => {
    setLoginScreen(true);
  };
  const toggleDarkMode = () => {
    setTheme(!theme);
  };
  return (
    <main className="register-main">
      <div className="register-card" data-theme={theme && "dark"}>
        <DarkModeBtn toggleDarkMode={toggleDarkMode} />
        <div className="register-image">
          {loginScreen ? <LoginIcon /> : <SignUpIcon />}
        </div>
        <div className="register-form">
          {loginScreen ? <Login signUp={signUp} /> : <SignUp logIn={logIn} />}
        </div>
      </div>
      <div className="glass"></div>
      {theme ? <BlackBg className="bg" /> : <LightBg className="bg" />}
      {state?.error && (
        <div className="max-size-img-error">
          <BiMessageSquareError className="error-icon" />
          <strong className="">{state.errorMessage}</strong>
        </div>
      )}
      {signupState?.error && (
        <div className="max-size-img-error">
          <BiMessageSquareError className="error-icon" />
          <strong className="">{signupState.errorMessage}</strong>
        </div>
      )}
    </main>
  );
};

export default Register;

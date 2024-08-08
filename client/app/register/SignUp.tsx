"use client"

import { useUserContext } from "../contexts/UserContext";

const SignUp = ({ logIn }: any) => {
  const {
    handleSignEmail,
    handleSignPassword,
    handleSignConfirmPass,
    handleSignUp,
    signupState,
  } = useUserContext();
  return (
    <div className="login">
      <form className="login-form" onSubmit={handleSignUp}>
        <h1>
          Hello,<br></br> Nice to meet you
        </h1>
        <input
          className="input"
          type="email"
          title="Email"
          name="email"
          placeholder="Enter your E-mail."
          value={signupState.email}
          onChange={handleSignEmail}
          required
        />
        <input
          className="input"
          type="password"
          title="Password"
          name="password"
          placeholder="Enter your Password."
          value={signupState.password}
          onChange={handleSignPassword}
          required
        />
        <input
          className="input"
          type="password"
          title="Password confirm"
          name="confirmPassword"
          placeholder="Confrim your password"
          value={signupState.confirmPassword}
          onChange={handleSignConfirmPass}
          required
        />
        <input
          className="signUp-Btn"
          title="Confirm sign-up"
          type="submit"
          name="signUp"
          value="SignUp"
        />
        <input
          className="login-Btn"
          title="Go to login page"
          type="button"
          name="login"
          value="Login"
          onClick={logIn}
        />
      </form>
    </div>
  );
};

export default SignUp;

"use client";

import { useUserContext } from "../contexts/UserContext";

const SignUp = ({ logIn }: any) => {
  const {handleSignupSubmit, signupRegister, handleSignup} = useUserContext();
  return (
    <div className="login">
      <form className="login-form" onSubmit={handleSignupSubmit(handleSignup)}>
        <h1>
          Hello,<br></br> Nice to meet you
        </h1>
        <input
          className="input"
          type="email"
          title="Email"
          placeholder="Enter your E-mail."
          {...signupRegister("email")}
        />
        <input
          className="input"
          type="password"
          title="Password"
          placeholder="Enter your Password."
          {...signupRegister("password")}
        />
        <input
          className="input"
          type="password"
          title="Password confirmation"
          placeholder="Confrim your password"
          {...signupRegister("confirmPassword")}
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

"use client";
import { useUserContext } from "../contexts/UserContext";

const Login = ({ signUp }: any) => {
  
  const { handleLogin, loginState, handleEmailChange, handlePasswordChange } =
    useUserContext();
  return (
    <div className="login">
      <form className="login-form" onSubmit={handleLogin}>
        <h1>
          Hello,<br></br> Welcome Back
        </h1>
        <label>
          <input
            className="input"
            type="email"
            title="Email"
            placeholder="Enter your E-mail."
            name="email"
            value={loginState?.email}
            onChange={handleEmailChange}
            required
          />
        </label>
        <label>
          <input
            className="input"
            type="password"
            title="Password"
            name="password"
            placeholder="Enter your Password."
            value={loginState?.password}
            onChange={handlePasswordChange}
            required
          />
        </label>
        <input
          className="login-Btn"
          title="Log-In button"
          type="submit"
          name="login"
          value="Login"
        />
        <input
          className="signUp-Btn"
          title="Sign-up button"
          type="button"
          name="signUp"
          value="SignUp"
          onClick={signUp}
        />
        <div className="loginwith">
          <button title="Google" type="button">
            Google
          </button>
          <button title="Facebook" type="button">
            Facebook
          </button>
          <button title="Github" type="button">
            Github
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;

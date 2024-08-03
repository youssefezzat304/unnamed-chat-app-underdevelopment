"use client";
import {
  ChangeEvent,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import UserContextType from "../utils/interfaces";
import {
  loginInitState,
  loginReducerFunction,
  USER_LOGIN_ACTION_TYPE,
} from "../utils/loginReducer";
import { ResponseType } from "../utils/types";
import {
  signUpinitState,
  signUpReducerFunction,
  USER_SIGNUP_ACTION_TYPE,
} from "../utils/signUpReducer";

const UserContext = createContext<UserContextType>({} as UserContextType);

export function UserContextWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  //------------------------ Login ----------------------------------------------------//
  const [loginState, loginDispatch] = useReducer(
    loginReducerFunction,
    loginInitState
  );

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    loginDispatch({ type: USER_LOGIN_ACTION_TYPE.EMAIL, payload: e.target.value });
  };
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    loginDispatch({
      type: USER_LOGIN_ACTION_TYPE.PASSWORD,
      payload: e.target.value,
    });
  };
  const logInResAction = (res: ResponseType) => {
    switch (res.title) {
      case "wrong email": {
        loginDispatch({
          type: USER_LOGIN_ACTION_TYPE.ERROR,
          payload:
            "Unable to find a User with this Email address or User does not exist.",
        });
        break;
      }
      case "wrong password": {
        loginDispatch({
          type: USER_LOGIN_ACTION_TYPE.ERROR,
          payload: "Wrong password!!",
        });
        break;
      }
      case "Error": {
        loginDispatch({
          type: USER_LOGIN_ACTION_TYPE.ERROR,
          payload: "Something went wrong",
        });
        break;
      }
      default:
        break
    }
  };
  const handleLogin = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    loginDispatch({
      type: USER_LOGIN_ACTION_TYPE.NOERROR,
    });
    const loginURL = process.env.NEXT_PUBLIC_API_LOGIN;
    const req = async (url: string): Promise<ResponseType> => {
      const data = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: loginState.email,
          password: loginState.password,
        }),
      });
      return data.json();
    };

    req(loginURL!).then((res) => {
      console.log(res);
      logInResAction(res);
    });
  };
  //------------------------ SignUp ----------------------------------------------------//
  const [signupState, signupDispatch] = useReducer(
    signUpReducerFunction,
    signUpinitState
  );
  const handleSignEmail = (e: ChangeEvent<HTMLInputElement>) => {
    signupDispatch({
      type: USER_SIGNUP_ACTION_TYPE.EMAIL,
      payload: e.target.value,
    });
  };
  const handleSignPassword = (e: ChangeEvent<HTMLInputElement>) => {
    signupDispatch({
      type: USER_SIGNUP_ACTION_TYPE.PASSWORD,
      payload: e.target.value,
    });
  };
  const handleSignConfirmPass = (e: ChangeEvent<HTMLInputElement>) => {
    signupDispatch({
      type: USER_SIGNUP_ACTION_TYPE.CONFIRMPASS,
      payload: e.target.value,
    });
  };
  const signUpResAction = (res: ResponseType) => {
    switch (res.title) {
      case "email used": {
        signupDispatch({
          type: USER_SIGNUP_ACTION_TYPE.ERROR,
          payload: "This email already used.",
        });
        break;
      }
      case "Error": {
        signupDispatch({
          type: USER_SIGNUP_ACTION_TYPE.ERROR,
          payload: "Something went wrong",
        });
        break;
      }
      default:
        break
    }
  };
  const handleSignUp = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    signupDispatch({
      type: USER_SIGNUP_ACTION_TYPE.NOERROR,
    });

    if (signupState.password !== signupState.confirmPassword) {
      loginDispatch({
        type: USER_LOGIN_ACTION_TYPE.ERROR,
        payload:
          "The passwords you entered do not match. Please ensure that both the 'Password' and 'Confirm Password' fields contain the same password and try again.",
      });
      return;
    }
    const signupURL = process.env.NEXT_PUBLIC_API_SIGNUP;
    const req = async (url: string): Promise<ResponseType> => {
      const data = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: signupState.email,
          password: signupState.password,
          confirmPassword: signupState.confirmPassword,
        }),
      });
      return data.json();
    };
    req(signupURL!).then((res) => {
      signUpResAction(res);
    });
  };
  // ============================================================================================ //
  return (
    <UserContext.Provider
      value={{
        handleLogin,
        handleEmailChange,
        handlePasswordChange,
        loginState,
        handleSignEmail,
        handleSignPassword,
        handleSignConfirmPass,
        signupState,
        handleSignUp,
        loginDispatch,
        signupDispatch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}

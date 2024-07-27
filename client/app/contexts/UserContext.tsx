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
  initState,
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
  const [state, dispatch] = useReducer(loginReducerFunction, initState);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: USER_LOGIN_ACTION_TYPE.EMAIL, payload: e.target.value });
  };
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: USER_LOGIN_ACTION_TYPE.PASSWORD,
      payload: e.target.value,
    });
  };
  const logInResAction = (res: ResponseType) => {
    if (res.status === 500) {
      if (res.status === 500) {
        dispatch({
          type: USER_LOGIN_ACTION_TYPE.ERROR,
          payload: res.message,
        });
      }
    }
  };
  const handleLogin = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const loginURL = process.env.NEXT_PUBLIC_API_LOGIN;
    const req = async (url: string): Promise<ResponseType> => {
      const data = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: state.email,
          password: state.password,
        }),
      });
      return data.json();
    };

    req(loginURL!).then((res) => {
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
    if (res.status === 500) {
      signupDispatch({
        type: USER_SIGNUP_ACTION_TYPE.ERROR,
        payload: res.message,
      });
    }
  };
  const handleSignUp = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const signupURL = process.env.NEXT_PUBLIC_API_SIGNUP;
    const req = async (url: string): Promise<ResponseType> => {
      const data = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: signupState.email,
          password: signupState.password,
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
        state,
        handleSignEmail,
        handleSignPassword,
        handleSignConfirmPass,
        signupState,
        handleSignUp,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}

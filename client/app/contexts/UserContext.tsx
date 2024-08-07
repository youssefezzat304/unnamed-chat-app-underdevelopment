"use client";
import { createContext, useContext } from "react";
import {
  loginValidation,
  LoginSchema,
  SignupSchema,
  signupValidation,
  UserContextType,
} from "../utils/interfaces";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../api";

const UserContext = createContext<UserContextType>({} as UserContextType);

export function UserContextWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  //------------------------ Login ----------------------------------------------------//
  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    setError: setLoginError,
    formState: { errors: loginErrors },
  } = useForm<LoginSchema>({ resolver: zodResolver(loginValidation) });

  const handleLogin: SubmitHandler<LoginSchema> = async (data) => {
    const userData = {
      email: data.email,
      password: data.password,
    };
    const login = async () => {
      try {
        const response = await api.post("/users/login", userData, {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        });

        // // Access the Set-Cookie header from the response
        // const setCookieHeader = response.headers["set-cookie"];

        // // You can now store the cookie or use it for subsequent requests
        // console.log("Cookie received:", setCookieHeader);

        if (response.data === "Invalid Email or password.") {
          setLoginError("email", {
            message: response.data,
          });
        } //else {
        //   router.replace("/");
        // }
        console.log(response);
      } catch (error: any) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    };

    login();
  };
  //------------------------ SignUp ----------------------------------------------------//
  const {
    register: signupRegister,
    handleSubmit: handleSignupSubmit,
    setError: setSignupError,
    formState: { errors: signupErrors },
  } = useForm<SignupSchema>({ resolver: zodResolver(signupValidation) });

  const handleSignup: SubmitHandler<SignupSchema> = async (data) => {
    if (data.password !== data.confirmPassword) {
      setSignupError("password", {
        message:
          "The passwords do not match. Please ensure that the 'Password' and 'Confirm Password' fields are identical.",
      });
      return;
    }

    const userData = {
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };
    console.log(userData);
    const signup = async () => {
      try {
        const response = await api.post("/users/signup", userData, {
          withCredentials: true,
        });

        console.log(response);
      } catch (error: any) {
        if (error.response.data.title === "email used") {
          setSignupError("email", {
            message: error.response.data.message,
          });
        }
        console.log("data    >>>>>", error.response.data);
        console.log("status  >>>>>", error.response.status);
        console.log("headers >>>>>", error.response.headers);
      }
    };

    signup();
  };
  // ============================================================================================ //
  return (
    <UserContext.Provider
      value={{
        loginRegister,
        handleLogin,
        handleLoginSubmit,
        loginErrors,
        setLoginError,
        handleSignup,
        signupRegister,
        handleSignupSubmit,
        setSignupError,
        signupErrors,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}

import { z, string } from "zod";
import {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetError,
} from "react-hook-form";

export interface LoginFormType {
  loginRegister: UseFormRegister<{
    email: string;
    password: string;
  }>;
  handleLogin: SubmitHandler<LoginSchema>;
  handleLoginSubmit: UseFormHandleSubmit<
    {
      email: string;
      password: string;
    },
    undefined
  >;
  loginErrors: FieldErrors<{
    email: string;
    password: string;
  }>;
  setLoginError: UseFormSetError<{
    email: string;
    password: string;
  }>;
}

export interface SignupFormType {
  signupRegister: UseFormRegister<{
    email: string;
    password: string;
    confirmPassword: string;
  }>;
  handleSignup: SubmitHandler<SignupSchema>;
  handleSignupSubmit: UseFormHandleSubmit<
    {
      email: string;
      password: string;
      confirmPassword: string;
    },
    undefined
  >;
  signupErrors: FieldErrors<{
    email: string;
    password: string;
    confirmPassword: string;
  }>;
  setSignupError: UseFormSetError<{
    email: string;
    password: string;
    confirmPassword: string;
  }>;
}

export const signupValidation = z.object({
  email: string()
    .min(1, "Email is required.")
    .email("This is not a valid E-mail."),
  password: string({
    required_error: "Password is required.",
  }).min(6, "Password should be min of 6 chars."),
  confirmPassword: string().min(1, "Password confirmation is required."),
});

export type SignupSchema = z.infer<typeof signupValidation>;

export const loginValidation = z.object({
  email: string()
    .min(1, "Email is required.")
    .email("Invalid Email or password."),
  password: string().min(1, "Password is required."),
});

export type LoginSchema = z.infer<typeof loginValidation>;

export type UserContextType = LoginFormType & SignupFormType;

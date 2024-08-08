import { ChangeEventHandler, Dispatch, ReactEventHandler, ReducerAction, ReducerState } from "react";
import { InitUserState, UserReducerType } from "./loginReducer";
import { SignUpInitialState, SignUpReducerType } from "./signUpReducer";

export default interface UserContextType {
  handleEmailChange?: ChangeEventHandler;
  handlePasswordChange?: ChangeEventHandler;
  loginState?: InitUserState;
  handleLogin?: ReactEventHandler;
  handleSignEmail: ChangeEventHandler;
  handleSignPassword: ChangeEventHandler;
  handleSignConfirmPass: ChangeEventHandler;
  signupState: SignUpInitialState;
  handleSignUp?: ReactEventHandler;
  loginDispatch: Dispatch<UserReducerType>;
  signupDispatch: Dispatch<SignUpReducerType>;
}

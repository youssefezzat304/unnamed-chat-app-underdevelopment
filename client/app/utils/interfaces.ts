import { ChangeEventHandler, ReactEventHandler } from "react";
import { InitUserState } from "./loginReducer";
import { SignUpInitialState } from "./signUpReducer";

export default interface UserContextType {
  handleEmailChange?: ChangeEventHandler;
  handlePasswordChange?: ChangeEventHandler;
  state?: InitUserState;
  handleLogin?: ReactEventHandler;
  handleSignEmail: ChangeEventHandler;
  handleSignPassword: ChangeEventHandler;
  handleSignConfirmPass: ChangeEventHandler;
  signupState: SignUpInitialState;
  handleSignUp?: ReactEventHandler;
}

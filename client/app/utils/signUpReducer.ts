export interface SignUpInitialState {
  email: string;
  password: string;
  confirmPassword: string;
  error: boolean;
  errorMessage: string;
}
export const signUpinitState = {
  email: "",
  password: "",
  confirmPassword: "",
  error: false,
  errorMessage: "",
};
export const enum USER_SIGNUP_ACTION_TYPE {
  EMAIL,
  PASSWORD,
  ERROR,
  NOERROR,
  CONFIRMPASS,
}
interface SignUpReducerType {
  type: USER_SIGNUP_ACTION_TYPE;
  payload?: string;
}
export const signUpReducerFunction = (
  signupState: SignUpInitialState,
  action: SignUpReducerType
): SignUpInitialState => {
  switch (action.type) {
    case USER_SIGNUP_ACTION_TYPE.EMAIL:
      return {
        ...signupState,
        email: action.payload ?? "",
      };
    case USER_SIGNUP_ACTION_TYPE.PASSWORD:
      return {
        ...signupState,
        password: action.payload ?? "",
      };
    case USER_SIGNUP_ACTION_TYPE.CONFIRMPASS:
      return {
        ...signupState,
        confirmPassword: action.payload ?? "",
      };
    case USER_SIGNUP_ACTION_TYPE.ERROR:
      return {
        ...signupState,
        error: !signupState.error,
        errorMessage: action.payload ?? "",
      };
    default:
      throw new Error();
  }
};

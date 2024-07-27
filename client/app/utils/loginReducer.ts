export interface InitUserState {
  email: string;
  password: string;
  error: boolean;
  errorMessage: string;
}
export const initState = {
  email: "",
  password: "",
  error: false,
  errorMessage: "",
}
export const enum USER_LOGIN_ACTION_TYPE {
  EMAIL,
  PASSWORD,
  ERROR,
}
interface UserReducerType {
  type: USER_LOGIN_ACTION_TYPE;
  payload?: string;
}

export const loginReducerFunction = (
  state: InitUserState,
  action: UserReducerType
): InitUserState => {
  switch (action.type) {   
    case USER_LOGIN_ACTION_TYPE.ERROR:
      return { ...state, error: !state.error, errorMessage: action.payload ?? "" };
    case USER_LOGIN_ACTION_TYPE.EMAIL:
      return { ...state, error: false, email: action.payload ?? "" };
    case USER_LOGIN_ACTION_TYPE.PASSWORD:
      return { ...state, error: false, password: action.payload ?? "" };
    default:
      throw new Error();
  }
};

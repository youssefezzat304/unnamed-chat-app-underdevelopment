import {
  ErrorMessage,
  ErrorTitle,
  HttpStatusCode,
} from "../../utils/exceptions/baseError.exception";
import { ValidationError } from "../../utils/exceptions/validationError.exception";
import UserModel, { User } from "./user.model";

class UserService {
  private user = UserModel;
  // -------------------  Signup a New User  ----------------------------//
  public async signUp(
    input: Partial<User>
  ): Promise<Error | any> {
    return UserModel.create(input)

  }
  // -------------------  Attempt to Login User  ----------------------------//
  public async login(
    email: string,
    password: string
  ): Promise<string | ValidationError> {
    const user = await this.user.findOne({ email });
    if (user === null) {
      throw new ValidationError(
        ErrorTitle.WRONG_CRED,
        HttpStatusCode.INTERNAL_SERVER,
        ErrorMessage.WRONG_CRED
      );
    }

    try {
      return "login successfully"
    } catch (error) {
      throw new ValidationError(
        ErrorTitle.WRONG_CRED,
        HttpStatusCode.INTERNAL_SERVER,
        ErrorMessage.WRONG_CRED
      );
    }
  }


}
export function createUser(input: Partial<User>) {
  return UserModel.create(input);
}

export function findUserById(id: string) {
  return UserModel.findById(id);
}

export function findUserByEmail(email: string) {
  return UserModel.findOne({ email });
}

export default UserService;

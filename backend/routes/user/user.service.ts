import {
  ErrorMessage,
  ErrorTitle,
  HttpStatusCode,
} from "../../utils/exceptions/baseError.exception";
import { ValidationError } from "../../utils/exceptions/validationError.exception";
import { Tokens } from "../../utils/interfaces/token.interface";
import token from "../../utils/token";
import UserModel from "./user.model";

class UserService {
  private user = UserModel;
  // -------------------  Signup a New User  ----------------------------//
  public async signUp(
    email: string,
    password: string
  ): Promise<Tokens | Error | any> {
    try {
      const user = await this.user.create({ email, password });

      const accessToken = token.createToken(
        user,
        process.env.JWT_ACCESS_SECRET,
        "30s"
      );
      const refreshToken = token.createToken(
        user,
        process.env.JWT_REFRESH_SECRET,
        "1d"
      );
      
      return {accessToken, refreshToken};
    } catch (error) {
      throw new ValidationError(
        ErrorTitle.EMAIL_USED,
        HttpStatusCode.INTERNAL_SERVER,
        ErrorMessage.EMAIL_USED
      );
    }
  }
  // -------------------  Attempt to Login User  ----------------------------//
  public async login(
    email: string,
    password: string
  ): Promise<string | ValidationError> {
    const user = await this.user.findOne({ email });
    if (user === null) {
      throw new ValidationError(
        ErrorTitle.WRONG_EMAIL,
        HttpStatusCode.INTERNAL_SERVER,
        ErrorMessage.WRONG_EMAIL
      );
    }

    if (await user.isValidPassword(password)) {
      return token.createToken(user, process.env.JWT_ACCESS_SECRET, "5m");
    } else {
      throw new ValidationError(
        ErrorTitle.WRONG_PASS,
        HttpStatusCode.INTERNAL_SERVER,
        ErrorMessage.WRONG_PASS
      );
    }
  }
}

export default UserService;

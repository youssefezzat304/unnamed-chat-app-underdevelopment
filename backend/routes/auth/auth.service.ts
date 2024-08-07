import { DocumentType } from "@typegoose/typegoose";
import { privateFeilds, User } from "../user/user.model";
import { signJwt } from "../../utils/jwt";
import { SessionModel } from "./session.model";
import { omit } from "lodash";

class AuthService {
  public signAccessToken(user: DocumentType<User>) {
    const payload = omit(user.toJSON(), privateFeilds);
    const accessToken = signJwt(payload, "accessTokenPrivateKey", {
      expiresIn: "15m",
    });

    return accessToken;
  }

  public async createSession({ userID }: { userID: string }) {
    return SessionModel.create({ user: userID });
  }

  public async findSessionById(id: string) {
    return SessionModel.findById(id);
  }

  public async signRefreshToken({ userID }: { userID: string }) {
    const session = await this.createSession({ userID });

    const refreshToken = signJwt(
      { session: session._id },
      "refreshTokenPrivateKey",
      {
        expiresIn: "1y",
      }
    );

    return refreshToken;
  }
}

export default AuthService;

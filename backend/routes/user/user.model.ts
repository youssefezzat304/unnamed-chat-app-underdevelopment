import {
  DocumentType,
  getModelForClass,
  modelOptions,
  pre,
  prop,
} from "@typegoose/typegoose";
import bcrypt from "bcrypt";

export const privateFeilds = ["password", "__v"];

@pre<User>("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
})
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class User {
  @prop({ lowercase: true, required: true, unique: true })
  email: string;

  @prop({ required: true })
  password: string;

  async validatePassword(this: DocumentType<User>, candidatePassword: string) {
    try {
      return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
      console.log(error, "Couldn't validate password.");
      return false;
    }
  }
}

const UserModel = getModelForClass(User);

export default UserModel;

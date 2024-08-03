import {
  DocumentType,
  getModelForClass,
  modelOptions,
  pre,
  prop,
} from "@typegoose/typegoose";
import bcrypt from "bcrypt";


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

// const UserSchema = new Schema(
//   {
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     confirmPassword: {
//       type: String,
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// UserSchema.methods.isValidPassword = async function (
//   password: string
// ): Promise<Error | boolean> {
//   return await bcrypt.compare(password, this.password);
// };

// export type userModelType = typeof UserSchema;

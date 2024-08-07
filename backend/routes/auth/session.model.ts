import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { User } from "../user/user.model";

export class Session {
  @prop({ ref: () => User })
  user: Ref<User>;

  @prop({ default: true })
  valid: boolean;
}

export const SessionModel = getModelForClass(Session, {
  schemaOptions: {
    timestamps: true,
  },
});

import { Document } from "mongoose";
import { object, string, TypeOf } from "zod";

// export default interface User extends Document {
//   email: string;
//   password: string;
//   isValidPassword(password: string): Promise<boolean | Error>;
// }

export const createUserSchema = object({
  body: object({
    email: string({
      required_error: "Email is required,",
    }).email("This is not a valid E-mail."),
    password: string({
      required_error: "Password is required,",
    }).min(6, "Password should be min of 6 chars."),
    confirmPassword: string({
      required_error: "Password confirmation is required,",
    }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  }),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>["body"]

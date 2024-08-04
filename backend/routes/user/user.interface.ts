import { Document } from "mongoose";
import { object, string, number, TypeOf, boolean, ZodIssueCode } from "zod";
import { ValidationError } from "../../utils/exceptions/validationError.exception";
import {
  ErrorMessage,
  ErrorTitle,
  HttpStatusCode,
} from "../../utils/exceptions/baseError.exception";

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
    message: ErrorMessage.NO_MATCHED_PASS,
    path: ["confirmPassword"],
  }),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>["body"];

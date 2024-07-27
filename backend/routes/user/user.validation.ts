import Joi from "joi";

const signUp = Joi.object({
  email: Joi.string().email().required(),

  password: Joi.string().min(8).required(),
  
  confirmPassword: Joi.string(),
});
const logIn = Joi.object({
  email: Joi.string().email().required(),

  password: Joi.string().required(),
});

export default { signUp, logIn };

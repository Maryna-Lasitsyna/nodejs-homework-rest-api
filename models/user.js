const Joi = require("joi");
const { Schema, model } = require("mongoose");
const { handleSaveError, runValidatorsAtUpdate } = require("./hooks");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      minlength: 6,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false },
  { timestamps: true }
);

userSchema.post("save", handleSaveError);

userSchema.pre("findOneAndUpdate", runValidatorsAtUpdate);

userSchema.post("findOneAndUpdate", handleSaveError);

const registerSchema = Joi.object({
  password: Joi.string().min(6).required().messages({
    "any.required": `missing required "password" field`,
  }),
  email: Joi.string().required().messages({
    "any.required": `missing required "email" field`,
  }),
  subscription: Joi.string(),
  token: Joi.string(),
});

const loginSchema = Joi.object({
  password: Joi.string().min(6).required().messages({
    "any.required": `missing required "password" field`,
  }),
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": `missing required "email" field`,
  }),
  token: Joi.string(),
});

const User = model("user", userSchema);

const schemas = {
  registerSchema,
  loginSchema,
};

module.exports = { User, schemas };

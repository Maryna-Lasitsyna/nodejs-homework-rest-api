const Joi = require("joi");
const { Schema, model } = require("mongoose");
const { handleSaveError, runValidatorsAtUpdate } = require("./hooks");

const nameRegExp = "^[A-Za-zА-Яа-я]+( [A-Za-zА-Яа-я]+)?$";

const contactSchema = new Schema(
  {
    name: {
      type: String,
      match: RegExp(nameRegExp),
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleSaveError);

contactSchema.pre("findOneAndUpdate", runValidatorsAtUpdate);

contactSchema.post("findOneAndUpdate", handleSaveError);

const addSchema = Joi.object({
  name: Joi.string().pattern(RegExp(nameRegExp)).required().messages({
    "any.required": `missing required name field`,
  }),
  email: Joi.string().required().messages({
    "any.required": `missing required email field`,
  }),
  phone: Joi.string().required().messages({
    "any.required": `missing required phone field`,
  }),
  favorite: Joi.boolean().required(),
});

const contactUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const Contact = model("contact", contactSchema);

const schemas = {
  addSchema,
  contactUpdateFavoriteSchema,
};

module.exports = { Contact, schemas };

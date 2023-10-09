const { Contact } = require("../models/сontact");
const { HttpError } = require("../helpers/index");

const ctrlWrapper = require("../decorators/ctrlWrapper");

const getAll = async (reg, res) => {
  const result = await Contact.find();
  res.json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const add = async (reg, res) => {
  const result = await Contact.create(reg.body);
  res.status(201).json(result);
};

const updateById = async (reg, res) => {
  const { id } = reg.params;

  const result = await Contact.findByIdAndUpdate(id, reg.body);
  if (!result) {
    throw HttpError(404, `Contact with ${id} not found`);
  }
  res.json(result);
};

const updateStatusContact = async (reg, res) => {
  const { id } = reg.params;

  const result = await Contact.findByIdAndUpdate(id, reg.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const removeContact = async (req, res) => {
  const { id } = req.params;
  const removedContact = await Contact.findByIdAndRemove(id);
  if (!removedContact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ message: "contact deleted" });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
  removeContact: ctrlWrapper(removeContact),
};

const contacts = require("../models/contacts");
const { HttpError } = require("../helpers/index");

const ctrlWrapper = require("../decorators/ctrlWrapper");

const getAll = async (reg, res) => {
  const result = await contacts.listContacts();
  res.json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.getContactById(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const add = async (reg, res) => {
  const result = await contacts.addContact(reg.body);
  res.status(201).json(result);
};

const updateById = async (reg, res) => {
  const { id } = reg.params;

  const result = await contacts.updateContactById(id, reg.body);
  if (!result) {
    throw HttpError(404, `Contact with ${id} not found`);
  }
  res.json(result);
};


const removeContact = async (req, res) => {
  const { id } = req.params;
  const removedContact = await contacts.removeContact(id);
  if (!removedContact) {
    throw HttpError(404, `Contact with id ${id} not found`);
  }
  res.status(200).json({ message: "contact deleted" });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  removeContact: ctrlWrapper(removeContact),
};

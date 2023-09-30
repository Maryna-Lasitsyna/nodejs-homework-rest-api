const express = require("express");

// const contacts = require('../../models/contacts');

const ctrl = require("../../controllers/contacts-controller");

const isEmptyBody = require("../../middlewares/index");

const validateBody = require("../../decorators/index");

const addSchema = require("../../schemas/contact-schemas");

const contactAddValidate = validateBody(addSchema);

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:id", ctrl.getById);

router.post("/", isEmptyBody, contactAddValidate, ctrl.add);

router.put("/:id", isEmptyBody, contactAddValidate, ctrl.updateById);

router.delete("/:id", ctrl.removeContact);

module.exports = router;

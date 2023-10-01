const express = require("express");

const ctrl = require("../../controllers/contacts-controller");

const isEmptyBody = require("../../middlewares/index");

const validateBody = require("../../decorators/index");

const addSchema = require("../../schemas/contact-schemas");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:id", ctrl.getById);

router.post("/", isEmptyBody, validateBody(addSchema), ctrl.add);

router.put("/:id", isEmptyBody, validateBody(addSchema), ctrl.updateById);

router.delete("/:id", ctrl.removeContact);

module.exports = router;

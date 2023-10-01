const express = require("express");

const ctrl = require("../../controllers/contacts");

const { isEmptyBody, validateBody } = require("../../middlewares/index");

const addSchema = require("../../schemas/contact");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:id", ctrl.getById);

router.post("/", isEmptyBody, validateBody(addSchema), ctrl.add);

router.put("/:id", isEmptyBody, validateBody(addSchema), ctrl.updateById);

router.delete("/:id", ctrl.removeContact);

module.exports = router;

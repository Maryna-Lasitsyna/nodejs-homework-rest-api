const express = require("express");

const ctrl = require("../../controllers/contacts");

const {
  isEmptyBody,
  validateBody,
  isValidId,
} = require("../../middlewares/index");

const { schemas } = require("../../models/Contact");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:id", isValidId, ctrl.getById);

router.post("/", isEmptyBody, validateBody(schemas.addSchema), ctrl.add);

router.put(
  "/:id",
  isValidId,
  isEmptyBody,
  validateBody(schemas.addSchema),
  ctrl.updateById
);

router.patch(
  "/:id/favorite",
  isValidId,
  isEmptyBody,
  validateBody(schemas.contactUpdateFavoriteSchema),
  ctrl.updateStatusContact
);

router.delete("/:id", isValidId, ctrl.removeContact);

module.exports = router;

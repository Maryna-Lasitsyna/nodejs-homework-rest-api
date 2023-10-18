const express = require("express");

const authCtrl = require("../../controllers/auth");

const {
  isEmptyBody,
  validateBody,
  authenticate,
} = require("../../middlewares/index");

const { schemas } = require("../../models/user");

const authRouter = express.Router();

authRouter.post(
  "/register",
  isEmptyBody,
  validateBody(schemas.registerSchema),
  authCtrl.register
);

authRouter.post(
  "/login",
  isEmptyBody,
  validateBody(schemas.loginSchema),
  authCtrl.login
);

authRouter.get("/current", authenticate, authCtrl.getCurrent);

authRouter.post("/logout", authenticate, authCtrl.logout);

module.exports = authRouter;

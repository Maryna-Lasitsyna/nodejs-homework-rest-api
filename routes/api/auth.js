const express = require("express");

const authCtrl = require("../../controllers/auth");

const {
  isEmptyBody,
  validateBody,
  authenticate,
  upload,
} = require("../../middlewares/index");

const { schemas } = require("../../models/user");

const authRouter = express.Router();

authRouter.post(
  "/register",
  isEmptyBody,
  validateBody(schemas.registerSchema),
  authCtrl.register
);

authRouter.get("/verify/:verificationToken", authCtrl.verify);

authRouter.post(
  "/verify",
  isEmptyBody,
  validateBody(schemas.emailSchema),
  authCtrl.resendVerifyEmail
);

authRouter.post(
  "/login",
  isEmptyBody,
  validateBody(schemas.loginSchema),
  authCtrl.login
);

authRouter.get("/current", authenticate, authCtrl.getCurrent);

authRouter.post("/logout", authenticate, authCtrl.logout);

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  authCtrl.updateAvatar
);

module.exports = authRouter;

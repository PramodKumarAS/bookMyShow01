const express = require("express");
const {registerController,loginController, getUserController, forgetPasswordController, resetPasswordController} = require("../Contollers/userController");
const authMiddleWare = require("../Middleware/authMiddleWare");
const router =express.Router();

router.post("/register",registerController);
router.post("/login",loginController);
router.get("/get-current-user",authMiddleWare, getUserController);
router.post("/forgetpassword",forgetPasswordController);
router.post("/resetpassword",resetPasswordController);

module.exports = router;
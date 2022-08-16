const express = require("express");
const auth = require("../../app/middlewares/checkAuth.js");
const router = express.Router();
//nap function handler vào trong file snewRoute để xử lý các route

const userController = require("../../app/controllers/user/UserController.js");


router.get("/pageLogin", userController.pageLogin);

router.get("/pageRegister", userController.pageRegister);

router.post("/register", userController.register);

router.post("/login" ,userController.login);

router.get("/logout", auth ,userController.logout);

router.get("/:id/infoUser", auth ,userController.infoUser);

router.get("/:id/shopping", auth ,userController.shopping);

router.patch("/:id/choose/:id", auth ,userController.choose);

router.patch("/:id/cancel/:id", auth ,userController.cancel);

router.patch("/:id/buy", auth ,userController.buy);

router.get("/:id/dashboard", auth ,userController.dashboard);

router.get("/:id/package", auth ,userController.package);








module.exports = router;




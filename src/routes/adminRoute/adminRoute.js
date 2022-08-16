const express = require("express");
const authAdmin = require("../../app/middlewares/authAdmin.js");
const router = express.Router();
//nap function handler vào trong file snewRoute để xử lý các route

const adminControllers = require("../../app/controllers/admin/AdminControllers.js");


router.get("/:slug", authAdmin, adminControllers.index);




module.exports = router;




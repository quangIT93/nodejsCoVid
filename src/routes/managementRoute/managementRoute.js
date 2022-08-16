const express = require("express");
const authManager = require("../../app/middlewares/authManager.js");
const router = express.Router();
//nap function handler vào trong file snewRoute để xử lý các route

const ManagementControllers = require("../../app/controllers/management/ManagementControllers.js");


router.get("/:slug", authManager ,ManagementControllers.index);




module.exports = router;
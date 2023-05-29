const express = require("express");
const { dashboard, login } = require("../controllers/main");
const { authenticationMiddleWare } = require("../middleware/auth");
const router = express.Router();

router.route("/dashboard").get(authenticationMiddleWare, dashboard);
router.route("/login").post(login);

module.exports = router;

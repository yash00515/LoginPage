 const express = require("express");
const router = express.Router();
const authController = require("../Controller/authController");

 router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);

 router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

 router.get("/logout", authController.logout);

 router.get("/reset", authController.getReset);
router.post("/reset", authController.postReset);

module.exports = router;

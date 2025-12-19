 const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middleware/AuthMiddleware");

router.get("/dashboard", authMiddleware, (req, res) => {
  res.render("dashboard");
});

module.exports = router;

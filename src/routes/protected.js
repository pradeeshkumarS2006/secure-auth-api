const express = require("express");

const router = express.Router();

router.get("/profile", (req, res) => {
  const authHeader = req.headers.authorization;

  // Check whether Authorization header is valid
  if (
    !authHeader ||
    !authHeader.startsWith("Bearer ") ||
    !authHeader.split(" ")[1]
  ) {
    return res.status(401).json({
      error: "Access token required",
    });
  }

  // Layer 1 placeholder
  res.status(200).json({
    message: "Token received",
  });
});

module.exports = router;
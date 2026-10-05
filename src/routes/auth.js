const express = require("express");
const supabase = require("../supabaseClient");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// POST /auth/signup
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  // Validate required fields
  if (!email || !password) {
    return res.status(400).json({
      error: "Email and password are required",
    });
  }

  // Create user
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return res.status(400).json({
      error: error.message,
    });
  }

  return res.status(201).json({
    user: data.user,
  });
});

// POST /auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Validate required fields
  if (!email || !password) {
    return res.status(400).json({
      error: "Email and password are required",
    });
  }

  // Authenticate user
  const { data, error } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (error || !data.session) {
    return res.status(401).json({
      error: "Invalid login credentials",
    });
  }

  return res.status(200).json({
    access_token: data.session.access_token,
    refresh_token: data.session.refresh_token,
  });
});

// POST /auth/logout
router.post("/logout", requireAuth, async (req, res) => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    return res.status(500).json({
      error: error.message,
    });
  }

  return res.sendStatus(204);
});

module.exports = router;
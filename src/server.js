require("dotenv").config(); // Must be the very first line

const express = require("express");

const publicRouter = require("./routes/public");
const authRouter = require("./routes/auth");
const protectedRouter = require("./routes/protected");

const supabase = require("./supabase");

const app = express();



// Middleware
app.use(express.json());

// Routes
app.use("/public", publicRouter);
app.use("/auth", authRouter);
app.use("/protected", protectedRouter);

// Port
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
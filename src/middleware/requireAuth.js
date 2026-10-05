const supabase = require("../supabaseClient");

const requireAuth = async (req, res, next) => {
  // 1. Read Authorization header
  const authHeader = req.headers.authorization;

  // 2. Check Bearer token
  if (
    !authHeader ||
    !authHeader.startsWith("Bearer ") ||
    !authHeader.split(" ")[1]
  ) {
    return res.status(401).json({
      error: "Access token required",
    });
  }

  // 3. Extract token
  const token = authHeader.split(" ")[1];

  // 4. Verify token with Supabase
  const { data, error } = await supabase.auth.getUser(token);

  // 5. Reject invalid/expired token
  if (error || !data.user) {
    return res.status(401).json({
      error: "Invalid or expired token",
    });
  }

  // 6. Attach authenticated user to request
  req.user = data.user;

  // 7. Continue to the route handler
  next();
};

module.exports = requireAuth;
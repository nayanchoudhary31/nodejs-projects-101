const jwt = require("jsonwebtoken");

const authenticationMiddleWare = async (req, resp, next) => {
  const authHeaders = req.headers.authorization;
  if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
    throw new CustomAPIError("Token is required!", 401);
  }
  // Get the token
  const token = authHeaders.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, username } = decoded;
    req.user = { id, username };
    next();
  } catch (error) {}
  next();
};

module.exports = { authenticationMiddleWare };

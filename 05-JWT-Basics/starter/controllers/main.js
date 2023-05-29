const CustomAPIError = require("../errors/custom-error");
const jwt = require("jsonwebtoken");
const login = async (req, resp) => {
  const { username, password } = req.body;

  // Validation for Username & Password
  if (!username || !password) {
    throw new CustomAPIError("Username & Password is Required", 400);
  }

  // Generally we used DB Id
  const id = new Date().getDate();

  // Generate JWT token with payload
  // Don't send private information in payload
  // Try to keep your payload for better user experience

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  return resp
    .status(200)
    .json({ msg: "User Login Successfully", token: token });
};

const dashboard = async (req, resp) => {
  const authHeaders = req.headers.authorization;
  if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
    throw new CustomAPIError("Token is required!", 401);
  }
  // Get the token
  const token = authHeaders.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const luckyNumber = Math.floor(Math.random() * 100);
    return resp.status(200).json({
      msg: `Hello, ${decoded.username}`,
      secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
    });
  } catch (error) {
    throw new CustomAPIError("Not  authorized to access this route!", 401);
  }
};

module.exports = { login, dashboard };

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
  const luckyNumber = Math.floor(Math.random() * 100);
  return resp.status(200).json({
    msg: `Hello Nayan`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

module.exports = { login, dashboard };

const login = async (req, resp) => {
  return resp.status(200).json({ msg: "User Login Successfully" });
};

const dashboard = async (req, resp) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  return resp.status(200).json({
    msg: `Hello Nayan`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

module.exports = { login, dashboard };

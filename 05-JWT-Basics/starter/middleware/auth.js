const authenticationMiddleWare = async (req, resp, next) => {
  console.log(req.headers.authorization);
  next();
};

module.exports = { authenticationMiddleWare };

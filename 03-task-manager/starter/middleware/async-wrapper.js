const asyncWrapper = (func) => {
  return async (req, resp, next) => {
    try {
      await func(req, resp, next);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = asyncWrapper;

const notFound = (req, resp) => {
  resp.status(404).json({msg:"Invalid Route !!!"});
};

module.exports = notFound;
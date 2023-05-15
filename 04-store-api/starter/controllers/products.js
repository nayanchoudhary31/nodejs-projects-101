const getAllStaticProducts = async (req, resp) => {
  resp.status(200).json({ msg: "All Static Products" });
};

const getAllProducts = async (req, resp) => {
  resp.status(200).json({ msg: "All Products" });
};

module.exports = { getAllStaticProducts, getAllProducts };

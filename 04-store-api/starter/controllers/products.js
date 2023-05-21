const Products = require("../models/product");
const getAllStaticProducts = async (req, resp) => {
  const products = await Products.find({}).sort("-price -name");
  resp.status(200).json({ products: products, nbHits: products.length });
};

const getAllProducts = async (req, resp) => {
  const { featured, company, name, sort, fields } = req.query;
  let queryObject = {};
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" }; // used for string pattern match option i is Case Sensative
  }
  let result = Products.find(queryObject);

  // Sort
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  //fields
  if (fields) {
    const fieldList = fields.split(",").join(" ");
    result = result.select(fieldList);
  }
  const products = await result;
  resp.status(200).json({ products, nbHits: products.length });
};

module.exports = { getAllStaticProducts, getAllProducts };

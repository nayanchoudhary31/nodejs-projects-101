require("dotenv").config();
const productJson = require("./products.json");
const connectDB = require("./db/connect");
const Product = require("./models/product");

const start = async () => {
  try {
    // Connect DB
    await connectDB(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.create(productJson);
    console.log(`Success`);
    process.exit(0); // Terminated Without Any Error
  } catch (error) {
    console.log(error);
    process.exit(1); // Terminated With Error
  }
};

start();

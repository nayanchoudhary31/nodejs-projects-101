const express = require("express");
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");
const connectDB = require("./db/connect");
require("dotenv").config();
const productRouter = require("./routes/products");

const app = express();

const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

//Routes

// app.use("/", (req, resp) => {
//   resp.send('<h1>Store Api</h1><a href="/api/v1/products">Products Route</a>');
// });

app.use("/api/v1/products", productRouter);

app.use(notFound);
app.use(errorHandler);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, console.log(`Server is listing on ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const path = require("path");

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const httpStatusText = require("./utilities/httpStatusText");

const url = process.env.MONGO_URL;

mongoose.connect(url).then(() => {
  console.log("MongoDB server started"); 
});

app.use(express.json());
app.use(cors());
const productsRouter = require("./routes/productsRoutes");
const usersRoutes = require("./routes/usersRoutes");

app.use("/api/products", productsRouter);
app.use("/api/users", usersRoutes);

// global middleware for roues not found
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: httpStatusText.ERROR,
    message: "this resource is not found",
  });
});

app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({
    status: error.statusText || httpStatusText.ERROR,
    message: error.message,
    code: error.statusCode || 500,
    data: null,
  });
});

app.listen(process.env.PORT, () => {
  console.log("server running at: 5000");
});

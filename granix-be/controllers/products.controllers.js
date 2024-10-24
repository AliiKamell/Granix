const { ValidationResult, validationResult } = require("express-validator");
const Products = require("../models/products.model");
const httpStatusText = require("../utilities/httpStatusText");
const asyncWrapper = require("../middlewares/asyncWrapper");
const appError = require("../utilities/appError");

const getAllProducts = asyncWrapper(async (req, res) => {
  const query = req.query;

  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page - 1) * limit;

  const products = await Products.find(
    {},
    {
      __v: false,
    }
  )
    .limit(limit)
    .skip(skip);
  res.json({ status: httpStatusText.SUCCESS, products });
});

const addProduct = asyncWrapper(async (req, res, next) => {
  const { title, price, number, description, category } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = appError.create(errors.array(), 400, httpStatusText.FAIL);
    return next(error);
  }
  const newProduct = new Products({
    title,
    price,
    number,
    description,
    category,
    avatar: req.file.filename,
  });
  await newProduct.save();
  res
    .status(201)
    .json({ status: httpStatusText.SUCCESS, data: { newProduct } });
});

const getProduct = asyncWrapper(async (req, res, next) => {
  const product = await Products.findById(req.params.productId);

  if (!product) {
    const error = appError.create(
      "product not found",
      404,
      httpStatusText.FAIL
    );
    return next(error);
  }
  return res.json({ status: httpStatusText.SUCCESS, data: { product } });
});

const updateProduct = asyncWrapper(async (req, res) => {
  const productId = req.params.productId;
  const updateProduct = await Products.updateOne(
    { _id: productId },
    {
      $set: { ...req.body },
    }
  );
  res
    .status(200)
    .json({ status: httpStatusText.SUCCESS, data: { updateProduct } });
});

const deleteProduct = asyncWrapper(async (req, res) => {
  const data = await Products.deleteOne({ _id: req.params.productId });
  res.status(200).json({ status: httpStatusText.SUCCESS, data: null });
});

module.exports = {
  getAllProducts,
  addProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};

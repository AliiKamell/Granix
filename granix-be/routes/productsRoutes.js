const express = require("express");
const router = express.Router();

const multer = require("multer");
const productsController = require("../controllers/products.controllers");
const userRoles = require("../utilities/userRoles");
const allowedTo = require("../middlewares/allowedTo");
const verifyToken = require("../middlewares/verifyToken");
const { validationSchemaProduct } = require("../middlewares/validationSchema");

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    const fileName = `product-${Date.now()}.${ext}`;
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  const imageType = file.mimetype.split("/")[0];

  if (imageType === "image") {
    return cb(null, true);
  } else {
    return appError.create("file must be an image", 400);
  }
};

const upload = multer({ storage: diskStorage, fileFilter });

router
  .route("/")
  .get(productsController.getAllProducts)
  .post(upload.single("avatar"), productsController.addProduct);

router
  .route("/:productId")
  .get(productsController.getProduct)
  .patch(productsController.updateProduct)
  .delete(productsController.deleteProduct);
module.exports = router;

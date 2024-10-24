const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users.controllers");
const multer = require("multer");
const appError = require("../utilities/appError");
const allowedTo = require("../middlewares/allowedTo");
const userRoles = require("../utilities/userRoles");
const verifyToken = require("../middlewares/verifyToken");

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    const fileName = `user-${Date.now()}.${ext}`;
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

router.route("/").get(usersController.getAllUsers);

router
  .route("/register")
  .post(upload.single("avatar"), usersController.register);

router.route("/login").post(usersController.login);

router.route("/:userId").delete(usersController.deleteUser);

module.exports = router;

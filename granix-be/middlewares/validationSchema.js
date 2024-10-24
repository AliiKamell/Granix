const { body } = require("express-validator");

const validationSchemaProduct = () => {
  return [
    body("title")
      .notEmpty()
      .withMessage("title is required")
      .islength({ min: 2 })
      .withMessage("title at least 2 charts"),
    body("price")
      .notEmpty()
      .withMessage("price is required")
      .islength({ min: 1 })
      .withMessage("price at least 1 charts"),
    body("number")
      .notEmpty()
      .withMessage("number is required")
      .islength({ min: 1 })
      .withMessage("number at least 1 charts"),
    body("description")
      .notEmpty()
      .withMessage("description is required")
      .islength({ min: 2 })
      .withMessage("description at least 2 charts"),
    body("category")
      .notEmpty()
      .withMessage("category is required")
      .islength({ min: 2 })
      .withMessage("category at least 1 charts"),
  ];
};

module.exports = {
  validationSchemaProduct,
};

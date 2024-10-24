const moongose = require("mongoose");
const productsSchema = new moongose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: "uploads/product-default.png",
  },
  category: {
    type: String,
    required: true,
  }
});

module.exports = moongose.model("Product", productsSchema);

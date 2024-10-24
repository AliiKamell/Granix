import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import "./CategoryPage.css";
import { fetchProducts } from "../../rtk/slices/products-slice";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { addToCart } from "../../rtk/slices/cart-slice";

function CategoryPage() {
  const { products, loading, error } = useSelector((state) => state.products); // Destructure to get products, loading, and error
  const dispatch = useDispatch();
  const { category } = useParams(); // Extract category from URL params

  useEffect(() => {
    dispatch(fetchProducts()); // Fetch products on component load
  }, [dispatch]);

  // Log the category and products for debugging
  console.log("Selected category:", category);
  console.log("All products:", products);

  // Filter products based on category
  const filteredProducts = Array.isArray(products)
    ? products.filter((product) => product.category === category)
    : [];

  // Log filtered products
  console.log("Filtered products:", filteredProducts);

  return (
    <div className="sec1-Pro">
      {loading ? (
        <Typography variant="h6" component="div" sx={{ marginTop: 2 }}>
          Loading products...
        </Typography>
      ) : error ? (
        <Typography variant="h6" component="div" sx={{ marginTop: 2 }}>
          Error loading products: {error}
        </Typography>
      ) : Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <div key={product._id} id="sec2-Pro">
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                alt={product.title}
                height="140"
                image={`http://localhost:5000/uploads/${product.avatar}`}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {product.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {product.description}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", fontWeight: "bold" }}
                >
                  Price: {product.price.toLocaleString()} EGP
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => dispatch(addToCart(product))}
                >
                  Add to Cart
                </Button>
                <Link to={`/product/${product._id}`}>
                  <Button size="small">Learn More</Button>
                </Link>
              </CardActions>
            </Card>
          </div>
        ))
      ) : (
        <Typography variant="h6" component="div" sx={{ marginTop: 2 }}>
          No products found in this category.
        </Typography>
      )}
    </div>
  );
}

export default CategoryPage;

import React, { useEffect } from "react";
import "./Products.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../rtk/slices/products-slice";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { addToCart } from "../../rtk/slices/cart-slice";

function Products() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts()); // Fetch products when the component mounts
  }, [dispatch]);

  // Accessing the products array correctly
  const { products, loading, error } = useSelector((state) => state.products);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading products: {error}</p>;

  return (
    <div className="sec1-Pro">
      {Array.isArray(products) && products.length > 0 ? (
        products.map((product) => (
          <div key={product.id} id="sec2-Pro">
            <Card sx={{ maxWidth: 345, height: "auto" }} className="card-main">
              <CardMedia
                component="img"
                alt={product.title}
                height="120"
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
                <Link to={`/product/${product.id}`}>
                  <Button size="small">Learn More</Button>
                </Link>
              </CardActions>
            </Card>
          </div>
        ))
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
}

export default Products;

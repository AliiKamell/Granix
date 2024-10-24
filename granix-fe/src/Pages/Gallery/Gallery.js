import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import "./Gallery.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../rtk/slices/products-slice";

export default function MasonryImageList() {
  // Access products array correctly from the state
  const { products, loading, error } = useSelector((state) => state.products); // Fix: state.products.products to access products array
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts()); // Fetch products on component mount
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading products: {error}</p>;

  return (
    <div className="gallery-main">
      <Box
        sx={{
          width: "100%",
          height: "80vh",
          overflowY: "scroll",
          align: "center",
          marginTop: 10,
        }}
      >
        <ImageList variant="masonry" cols={3} gap={8}>
          {Array.isArray(products) && products.length > 0 ? (
            products.map((product) => (
              <ImageListItem key={product.id}>
                <img
                  srcSet={`${product.avatar}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  src={`http://localhost:5000/uploads/${product.avatar}`}
                  alt={product.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))
          ) : (
            <p>No products available</p>
          )}
        </ImageList>
      </Box>
    </div>
  );
}

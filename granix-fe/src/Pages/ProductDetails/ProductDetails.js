// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router";
// import Button from "@mui/material/Button";
// import "./ProductsDetails.css";
// import { addToCart } from "../../rtk/slices/cart-slice";
// import { fetchProducts } from "../../rtk/slices/products-slice";

// function ProductDetails() {
//   const { id } = useParams(); // Extract the product ID from the URL params
//   const dispatch = useDispatch();

//   // Destructure the products, loading, and error from the Redux state
//   const { products, loading, error } = useSelector((state) => state.products);

//   useEffect(() => {
//     // Fetch products if not already fetched
//     if (products.length === 0) {
//       dispatch(fetchProducts());
//     }
//   }, [dispatch, products.length]);

//   // Find the product by ID
//   const product = products.find((product) => product.id === id);

//   if (loading) {
//     return <div>Loading...</div>; // Show loading state if fetching
//   }

//   if (error) {
//     return <div>Error loading product details: {error}</div>; // Show error state if there is an error
//   }

//   if (!product) {
//     return <div>Product not found.</div>; // If product isn't found yet, display a message
//   }

//   return (
//     <div className="details-main">
//       <div className="img-main-details">
//         <img
//           src={`http://localhost:5000/uploads/${product.avatar}`}
//           alt={product.title}
//           className="product-img-details"
//         />
//       </div>
//       <div className="product-details">
//         <h1 className="product-title detail">{product.title}</h1>
//         <p className="product-desc detail">
//           Description: {product.description}
//         </p>
//         <p className="product-price detail">Price: {product.price} EGP</p>
//         <p className="product-category detail">Category: {product.category}</p>
//         <Button size="small" onClick={() => dispatch(addToCart(product))}>
//           Add to Cart
//         </Button>
//       </div>
//     </div>
//   );
// }

// export default ProductDetails;


import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Button from "@mui/material/Button";
import "./ProductsDetails.css";
import { addToCart } from "../../rtk/slices/cart-slice";
import { fetchProducts } from "../../rtk/slices/products-slice";

function ProductDetails() {
  const { id } = useParams(); // Extract the product ID from the URL params
  const dispatch = useDispatch();

  // Destructure the products, loading, and error from the Redux state
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    // Fetch products if not already fetched
    if (!loading && products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, loading, products.length]);

  // Convert id to a string to compare with product.id
  const product = products.find((product) => product.id.toString() === id);

  if (loading) {
    return <div>Loading...</div>; // Show loading state if fetching
  }

  if (error) {
    return <div>Error loading product details: {error}</div>; // Show error state if there is an error
  }

  if (!product) {
    return <div>Product not found.</div>; // If product isn't found yet, display a message
  }

  return (
    <div className="details-main">
      <div className="img-main-details">
        <img
          src={`http://localhost:5000/uploads/${product.avatar}`}
          alt={product.title}
          className="product-img-details"
        />
      </div>
      <div className="product-details">
        <h1 className="product-title detail">{product.title}</h1>
        <p className="product-desc detail">
          Description: {product.description}
        </p>
        <p className="product-price detail">Price: {product.price} EGP</p>
        <p className="product-category detail">Category: {product.category}</p>
        <Button size="small" onClick={() => dispatch(addToCart(product))}>
          Add to Cart
        </Button>
      </div>
    </div>
  );
}

export default ProductDetails;

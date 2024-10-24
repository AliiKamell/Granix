import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./slices/products-slice";
import cartSlice from "./slices/cart-slice";
import usersSlice from "./slices/users-slice";

export const store = configureStore({
  reducer: {
    products: productsSlice,
    cart: cartSlice,
    users: usersSlice,
  },
});

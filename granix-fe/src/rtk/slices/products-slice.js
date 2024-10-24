import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { PorductsApi } from "../../store/apis/apis";

// Fetch products thunk
export const fetchProducts = createAsyncThunk(
  "productsSlice/getProducts",
  async () => {
    const res = await axios.get(PorductsApi());
    const products = res.data.products; // Access the array within data

    const product = products.map((product) => ({
      title: product.title,
      price: product.price,
      category: product.category,
      description: product.description,
      avatar: product.avatar,
      quantity: product.number,
      id: product._id,
    }));
    return product;
  }
);

// Delete product thunk
export const deleteProduct = createAsyncThunk(
  "productsSlice/deleteProduct",
  async (productId, { rejectWithValue }) => {
    try {
      await axios.delete(`${PorductsApi()}/${productId}`); // Make sure the API supports this URL pattern
      return productId; // Return the ID of the deleted product
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const productsSlice = createSlice({
  name: "productsSlice",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      // Handle deletion of a product
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product.id !== action.payload
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.error = action.payload; // Store error if deletion fails
      });
  },
});


export default productsSlice.reducer;

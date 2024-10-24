// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { UsersApi } from "../../store/apis/apis";
// import axios from "axios";

// export const fetchUsers = createAsyncThunk("usersSlice/getUsers", async () => {
//   const res = await axios.get(UsersApi());
//   const users = res.data.users; // Access the array within data

//   const user = users.map((user) => ({
//     email: user.email,
//     password: user.password,
//     firstName: user.firstName,
//     lastName: user.lastName,
//     avatar: user.avatar,
//   }));
//   return user;
// });

// const usersSlice = createSlice({
//   initialState: [],
//   name: "usersSlice",
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(fetchUsers.fulfilled, (state, action) => {
//       return action.payload;
//     });
//   },
// });

// export const {} = usersSlice.actions;

// export default usersSlice.reducer;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import { UsersApi } from "../../store/apis/apis";

// // Mock users for the login functionality
// export const fetchUsers = createAsyncThunk("usersSlice/getUsers", async () => {
//   const res = await axios.get(UsersApi());
//   const users = res.data.users; // Access the array within data

//   const user = users.map((user) => ({
//     email: user.email,
//     password: user.password,
//     firstName: user.firstName,
//     lastName: user.lastName,
//     avatar: user.avatar,
//   }));
//   return user;
// });

// // Mock login thunk
// export const login = createAsyncThunk(
//   "users/login",
//   async ({ email, password }, { rejectWithValue }) => {
//     // Simulate login process with mock users
//     const user = user.find(
//       (u) => u.email === email && u.password === password
//     );

//     if (user) {
//       return user.token; // Return the token if user is found
//     } else {
//       return rejectWithValue("Invalid email or password."); // Return error if login fails
//     }
//   }
// );

// // Create the usersSlice with login handling
// const usersSlice = createSlice({
//   name: "users",
//   initialState: {
//     users: [], // Can still use fetchUsers for other users if needed
//     loading: false,
//     error: null,
//     token: null, // To store the token on successful login
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     // Handle login actions
//     builder
//       .addCase(login.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(login.fulfilled, (state, action) => {
//         state.loading = false;
//         state.token = action.payload; // Store the token
//       })
//       .addCase(login.rejected, (state, action) => {
//         state.loading = false;
//         state.token = null;
//         state.error = action.payload; // Store error message
//       });
//   },
// });

// export default usersSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UsersApi } from "../../store/apis/apis";

// Async thunk for fetching users
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const res = await axios.get(UsersApi());
  return res.data.users.map((user) => ({
    email: user.email,
    password: user.password,
    firstName: user.firstName,
    lastName: user.lastName,
    avatar: user.avatar,
  }));
});

// Async thunk for login
export const login = createAsyncThunk(
  "users/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email,
          password,
        }
      );
      return response.data.data.token; // Adjust this based on your backend response structure
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed.");
    }
  }
);

// Create the users slice
const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
    error: null,
    token: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Handle fetch users
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Capture error message
      })
      // Handle login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear any previous errors
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload; // Store the token
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Capture error message
      });
  },
});

// Export the reducer to be used in the store
export default usersSlice.reducer;

// import * as React from "react";
// import { AppProvider, SignInPage } from "@toolpad/core";
// import { useTheme } from "@mui/material/styles";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Login.css";

// // preview-start
// const providers = [{ id: "credentials", name: "Email and Password" }];
// // preview-end

// export default function Login() {
//   const signIn = async (provider, formData) => {
//     const navigate = useNavigate();
//     navigate("/upload");
//     const promise = new Promise((resolve) => {
//       setTimeout(() => {
//         alert(
//           `Signing in with "${provider.name}" and credentials: ${formData.get("email")}, ${formData.get("password")}`
//         );
//         resolve();
//       }, 300);
//     });
//     return promise;
//   };

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const theme = useTheme();
//   return (
//     // preview-start
//     <div id="main-signin">
//       <AppProvider theme={theme}>
//         <form onSubmit={signIn}>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <button type="submit">Login</button>
//         </form>{" "}
//       </AppProvider>
//     </div>
//     // preview-end
//   );
// }

// import * as React from "react";
// import { useTheme } from "@mui/material/styles";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import "./Login.css";

// import TextField from "@mui/material/TextField";
// import { fetchUsers } from "../../store/actions/users-action";

// // preview-start
// const providers = [{ id: "credentials", name: "Email and Password" }];
// // preview-end

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate(); // Move useNavigate here

//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchUsers());
//   }, []);
//   const users = useSelector((state) => state.users);
//   console.log(users);

//   const signIn = async (provider, formData) => {
//     const promise = new Promise((resolve) => {
//       setTimeout(() => {
//         resolve();
//         // After successful sign-in, navigate to the /upload page
//         navigate("/upload");
//       }, 300);
//     });
//     return promise;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.set("email", email);
//     formData.set("password", password);
//     signIn(providers[0], formData); // Call signIn with the provider and formData
//   };

//   return (
//     <div id="main-signin">
//       <form onSubmit={handleSubmit} className="sign-in-form">
//         <input
//           type="email"
//           placeholder="Email"
//           className="email input"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="password input"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit" className="button input">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }



// import * as React from "react";
// import { useTheme } from "@mui/material/styles";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import bcrypt from "bcryptjs"; // Import bcryptjs
// import "./Login.css";

// import { login } from "../../../../cartify-be/controllers/users.controllers";

// import { fetchUsers } from "../../store/actions/users-action";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchUsers()); // Fetch users from the backend
//   }, [dispatch]);

//   const users = useSelector((state) => state.users);

//   const signIn = async () => {
//     // Find a user with the matching email
//     const user = users.find((user) => user.email === email);

//     if (user) {
//       // Compare the entered password with the stored hashed password
//       const isMatch = await bcrypt.compare(password, user.password); // Compare hashed passwords

//       if (isMatch) {
//         // If passwords match, navigate to the /upload page
//         navigate("/upload");
//       } else {
//         // If passwords don't match, set an error message
//         setError("Invalid email or password");
//       }
//     } else {
//       // If no user found with the given email, set an error message
//       setError("Invalid email or password");
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     login(); // Call signIn to check credentials
//   };

//   return (
//     <div id="main-signin">
//       <form onSubmit={handleSubmit} className="sign-in-form">
//         <input
//           type="email"
//           placeholder="Email"
//           className="email input"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="password input"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         {error && <p className="error-message">{error}</p>}{" "}
//         {/* Display error */}
//         <button type="submit" className="button input">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { login } from "../../store/actions/users-action"; // Import the login action
// import "./Login.css";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   // Get state from Redux store
//   const { loading, error, token } = useSelector((state) => state.users);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(login(email, password)); // Dispatch the login action
//   };

//   // If login is successful (i.e., token is received), redirect to upload page
//   if (token) {
//     navigate("/upload");
//   }

//   return (
//     <div id="main-signin">
//       <form onSubmit={handleSubmit} className="sign-in-form">
//         <input
//           type="email"
//           placeholder="Email"
//           className="email input"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//           id="input"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="password input"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           id="input"
//         />
//         {error && <p className="error-message">{error}</p>} {/* Display error */}
//         <button type="submit" className="button input" disabled={loading}>
//           {loading ? 'Logging in...' : 'Login'}
//         </button>
//       </form>
//     </div>
//   );
// }




// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { login } from "../../rtk/slices/users-slice";
// import "./Login.css";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   // Get state from Redux store
//   const { loading, error, token } = useSelector((state) => state.users);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(login({ email, password })); // Pass the email and password as an object
//   };

//   // If login is successful (i.e., token is received), redirect to upload page
//   if (token) {
//     navigate("/upload");
//   }

//   return (
//     <div id="main-signin">
//       <form onSubmit={handleSubmit} className="sign-in-form">
//         <input
//           type="email"
//           placeholder="Email"
//           className="email input"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//           id="input"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="password input"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           id="input"
//         />
//         {error && <p className="error-message">{error}</p>}{" "}
//         {/* Display error */}
//         <button type="submit" className="button input" disabled={loading}>
//           {loading ? "Logging in..." : "Login"}
//         </button>
//       </form>
//     </div>
//   );
// }


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../rtk/slices/users-slice";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Get state from Redux store
  const { loading, error, token } = useSelector((state) => state.users);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password })); // Pass email and password
  };

  // If login is successful (i.e., token is received), redirect to upload page
  if (token) {
    navigate("/upload");
  }

  return (
    <div id="main-signin">
      <form onSubmit={handleSubmit} className="sign-in-form">
        <input
          type="email"
          placeholder="Email"
          className="email input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          id="input"
        />
        <input
          type="password"
          placeholder="Password"
          className="password input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          id="input"
        />
        {error && <p className="error-message">{error}</p>} {/* Display error */}
        <button type="submit" className="button input" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

import { Route, Routes } from "react-router";
import ResponsiveAppBar from "./components/Navbar/Navbar";
import Products from "./Pages/Products/Products";
import Register from "./Pages/Register/Register";
import Home from "./Pages/Home/Home";
import Footer from "./components/Footer/Footer";
import Login from "./Pages/Login/Login";
import Upload from "./Pages/Upload/Upload";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import CategoryPage from "./Pages/CategoryPage/CategoryPage";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import MasonryImageList from "./Pages/Gallery/Gallery";
import About from "./Pages/About/About";
import Cart from "./Pages/Cart/Cart";

import("./App.css");

const App = () => {
  return (
    <div>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="signin" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="cart" element={<Cart />} />
        <Route path="about" element={<About />} />
        <Route path="gallery" element={<MasonryImageList />} />
        <Route path=":category" element={<CategoryPage />} />
        <Route path="product/:id" element={<ProductDetails />} />
        <Route
          path="/upload"
          element={
            <PrivateRoute>
              <Upload />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;

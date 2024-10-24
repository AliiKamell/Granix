import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { GiMountaintop } from "react-icons/gi";
import { useSelector } from "react-redux";
import("./Navbar.css");

const pages = ["Home", "Products", "About Us", "Gallery"];
const pagesLinks = ["/", "/products", "/about", "/gallery"];
const signs = ["Sign in"];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const cart = useSelector((state) => state.cart);

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            <Link to="/" className="logo-link">
              Granix
              <GiMountaintop />
            </Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page, index) => (
                <MenuItem key={index} onClick={handleCloseNavMenu}>
                  <Link sx={{ textAlign: "center" }} to={pagesLinks[index]}>
                    {page}
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 1,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 600,
              flexDirection: "row",
              alignItems: "center",
              letterSpacing: ".2rem",
              color: "inherit",
              textDecoration: "none",
              justifyContent: "center",
            }}
          >
            <Link to="/" className="logo-link">
              Granix
            </Link>
            <GiMountaintop />
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
            }}
          >
            {pages.map((page, index) => (
              <MenuItem key={index} onClick={handleCloseNavMenu}>
                <Link to={pagesLinks[index]} className="btn-menu">
                  {page}
                </Link>
              </MenuItem>
            ))}
          </Box>
          <Box
            sx={{
              flexGrow: 0,
              display: { md: "flex" },
              flexDirection: { md: "row" },
            }}
            className="sign-nav"
          >
            {signs.map((sign, index) => (
              <React.Fragment key={index}>
                <MenuItem>
                  <Link to="/cart" className="btn-menu">
                    <ShoppingCartIcon />
                    {cart.length}
                  </Link>
                </MenuItem>
                <MenuItem key={index} onClick={handleCloseNavMenu}>
                  <Link to="signin" className="btn-menu">
                    {sign}
                  </Link>
                </MenuItem>
              </React.Fragment>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;

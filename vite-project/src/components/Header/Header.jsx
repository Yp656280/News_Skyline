import React, { useState, useEffect } from "react";
import {
  styled,
  alpha,
  createTheme,
  ThemeProvider,
} from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../../assets/new Logo.png";
import logout from "../../assets/power-on.png";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { logout as logoutStore } from "../../store/authSlice";
import { useDispatch } from "react-redux";
const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: "#000000",
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const pages = [
  { name: "Home", link: "/home" },
  {
    name: "News",
    link: `/home/news/${sessionStorage.getItem("city") || "indore"}`,
  },
  {
    name: "Weather",
    link: `/home/weather/${sessionStorage.getItem("city") || "indore"}`,
  },
];

const navigationStyle = {
  width: "9%",
  backgroundColor: "transparent",
  display: "flex",
  justifyContent: "right",
  alignItems: "center",
};

const imgStyle = {
  width: "25px",
  borderRadius: "50px",
  float: "left",
};

const logoutStyle = {
  fontSize: "0.8em",
  fontFamily: "'Oswald', sans-serif",
  position: "relative",
  right: "-18px",
  bottom: "-4px",
  overflow: "hidden",
  letterSpacing: "3px",
  opacity: 0,
  transition: "opacity 0.45s",
  WebkitTransition: "opacity 0.35s",
};

const buttonStyle = {
  textDecoration: "none",
  float: "right",
  padding: "12px",
  color: "white",
  width: "50px",
  backgroundColor: "transparent",
  transition: "width 0.35s",
  WebkitTransition: "width 0.35s",
  overflow: "hidden",
  maxHeight: "50px",
};

const buttonHoverStyle = {
  width: "130px",
};

const logoutHoverStyle = {
  opacity: 0.9,
};

function Header({ onSearchInputChange }) {
  const url = useLocation();
  const [location, setLocation] = useState();
  useEffect(() => {
    setLocation(url);
  }, [url]);

  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logoutStore());
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <ThemeProvider theme={theme}>
      <StyledAppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div" // Changed from "a" to "div"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <Link to="/home">
                <img
                  src={logo}
                  alt="logo"
                  style={{ height: "4rem", width: "10rem" }}
                />
              </Link>
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="menu"
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
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                    <Typography
                      variant="body1"
                      textAlign="center"
                      component="a"
                      href={page.link}
                    >
                      {page.name}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Link
                  to={`${page.link}`}
                  key={page.name}
                  sx={{ my: 2, color: "white", display: "block" }}
                  className="px-4"
                >
                  {page.name}
                </Link>
              ))}
            </Box>
            {location?.pathname === "/home" ||
            location?.pathname.includes("/home/weather") ? null : (
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  onChange={onSearchInputChange}
                />
              </Search>
            )}
            <div style={navigationStyle}>
              <a
                className="button"
                onClick={handleLogout}
                href="#"
                style={buttonStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.width = buttonHoverStyle.width;
                  e.currentTarget.querySelector(".logout").style.opacity =
                    logoutHoverStyle.opacity;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.width = buttonStyle.width;
                  e.currentTarget.querySelector(".logout").style.opacity =
                    logoutStyle.opacity;
                }}
              >
                <img src={logout} alt="Profile" style={imgStyle} />
                <div className="logout" style={logoutStyle}>
                  LOGOUT
                </div>
              </a>
            </div>
          </Toolbar>
        </Container>
      </StyledAppBar>
    </ThemeProvider>
  );
}

export default Header;

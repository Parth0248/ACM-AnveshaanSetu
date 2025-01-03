import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ACMLogo from "../../logos/ACM.png";
import { Link } from "react-router-dom";


function ResponsiveAppBar({ pages }) {
  const settings = ["Profile", "Logout"];
  var isLoggedIn = true; // TODO: Remove this and replace it with Logic
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (page) => {
    if (page === "APPLICATIONS") {
      if (localStorage.getItem("type") === "mentor") {
        window.location.href = "/mentorDashboard";
      } else if(localStorage.getItem("type") === "admin"){
        window.location.href = "/adminDashboard";
      } else {
        window.location.href = "/myApplications";
      }
    } else if (page === "ADD MENTOR") {
      window.location.href = "/addNewMentor";
    }
    else if(page=== "ALL USERS"){
      if (localStorage.getItem("type") === "admin") {
        window.location.href = "/allUsers";
      }
    }

    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (setting) => {
    setAnchorElUser(null);
    if (setting === "Profile") {
      if (localStorage.getItem("type") === "mentor") {
        window.location.href = "/mentorProfile";
      } else if (localStorage.getItem("type") === "mentee") {
        window.location.href = "/profile";
      } else if (localStorage.getItem("type") === "admin") {
        window.location.href = "/adminProfile";
      }
    } else if (setting === "Logout") {
      localStorage.clear();
      window.location.href = "/";
    }
  };

  const handleLogoClick = () => {
    window.location.href = "/";
  };
  
  return (
    <AppBar
      position="static"
      color="primary"
      style={{ backgroundColor: "#121212", borderRadius: "10px" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <div
            onClick={handleLogoClick}
            style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
          >
            <Avatar
              src={ACMLogo}
              alt="ACM Logo"
              sx={{ width: 60, height: 60 }}
            />

            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                padding: "10px",
              }}
            >
              Anveshan Setu
            </Typography>
          </div>
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
              {pages.map((page) => (
                <MenuItem key={page} onClick={()=>handleCloseNavMenu(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={()=>handleCloseNavMenu(page)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {isLoggedIn ? (
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="User" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
            ) : (
              <Box sx={{ display: "flex" }}>
                <Button component={Link} to="/login" color="inherit">
                  Login
                </Button>
                <Button component={Link} to="/signup" color="inherit">
                  Sign Up
                </Button>
              </Box>
            )}
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => handleCloseUserMenu(setting)}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;

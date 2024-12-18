import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.scss";
import logoWhite from "../images/logo/submark_white.png";
import logoImage from "../images/logo/submark.png";

const pages: string[] = [];
const settings: string[] = [];
if (localStorage.getItem("token") !== null) {
  pages.push("Accueil", "Calendrier", "Profil");
}

if (localStorage.getItem("token") !== null) {
  settings.push("Créer une mission", "Profil", "Réglages", "Referent", "Logout");
} else {
  settings.push("Connexion", "Inscription");
}

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const navigate = useNavigate();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMenuItemClick = (setting: string) => {
    handleCloseUserMenu();

    switch (setting) {
      case "Profil":
        navigate("/profile");
        break;
      case "Logout":
        handleLogout();
        break;
      default:
        break;
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  let color_blind = localStorage.getItem("color_blind") === "true";

  return (
    <AppBar
      position="static"
      background-color="#F5F5F5"
      style={{
        background: !color_blind ? "#598b7d" : "#3b3d3c",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Avatar alt="User" src={logoWhite} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "montserrat",
              fontWeight: "bold",
              letterSpacing: ".3rem",
              color: "#F5F5F5",
              textDecoration: "none",
            }}
          >
            HiVolunteer
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
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={() => {
                    console.log("hd");
                  }}
                >
                  {page}
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            HiVolunteer
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                component={Link}
                to={`/${page.toLowerCase()}`}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User" src={logoImage} />
              </IconButton>
            </Tooltip>
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
                  onClick={() => handleMenuItemClick(setting)}
                >
                  <Typography
                    textAlign="center"
                    component={Link}
                    to={setting === "Profil" ? "/profile" : "/"}
                    onClick={() => {
                      handleCloseUserMenu();
                      switch (setting) {
                        case "Créer une mission":
                          window.location.href = "/missionCreation";
                          break;
                        case "Profil":
                          navigate("/profile");
                          break;
                        case "Réglages":
                          window.location.href = "/settings";
                          break;
                        case "Referent":
                          window.location.href = "/settings/referents";
                          break;
                        case "Logout":
                          console.log("logout");
                          localStorage.removeItem("token");
                          localStorage.removeItem("role");
                          window.location.reload();
                          window.location.href = "/";
                          break;
                        case "Connexion" || "Inscription":
                          window.location.href = "/auth";
                          break;
                        
                        default:
                          break;
                      }
                    }}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {setting}
                  </Typography>
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

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
import config from "../config";
import NotificationBell from "../components/Notifications/NotificationBell";

const pages: string[] = [];
const settings: string[] = [];
const pagesLink: { [pageName: string]: string } = {};

if (localStorage.getItem("token") !== null) {
  settings.push("Profile", "Réglages", "Déconnexion");
  pages.push("Mes missions", "Calendrier", "Référents", "Affiliations", "FAQ");
  pagesLink["Mes missions"] = "accueil";
  pagesLink["Calendrier"] = "calendrier";
  pagesLink["Référents"] = "referent";
  pagesLink["Affiliations"] = "affiliatedCompanies";
  pagesLink["FAQ"] = "faq";
} else {
  settings.push("Connexion", "Inscription");
}


export default function AssociationSidebar() {
  let color_blind = localStorage.getItem("color_blind") === "true";
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const [notifications, setNotifications] = React.useState<any[]>([]);
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => { setAnchorElNav(event.currentTarget); };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => { setAnchorElUser(event.currentTarget); };
  const handleCloseNavMenu = () => { setAnchorElNav(null); };
  const handleCloseUserMenu = () => { setAnchorElUser(null); };
  const [count, setCount] = React.useState(0);

  const handleMenuItemClick = (setting: string) => {
    handleCloseUserMenu();
    switch (setting) {
      case "Profile":
        navigate("/profile");
        break;
      case "Déconnexion":
        handleLogout();
        break;
      default:
        break;
    }
  };

  React.useEffect(() => {
    const fetchNotifications = async () => {
      try {
        await fetch(`${config.apiUrl}/notifications/list/Association/personal`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }).then((response) => {
          if (response.status === 200) {
            response.json().then((data) => {
              const sortedNotifications = data.notifications.sort((a: any, b: any) => {
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
              });
              setNotifications(sortedNotifications);
              setCount(1)
            })
          }
        });
      } catch (error) {
        console.error(error);
      }
    };

    (count === 0) && fetchNotifications();
    (count === 1) && setTimeout(() => setCount(0), 1000);

  }, [count]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <AppBar position="static" background-color="#F5F5F5" style={{ background: !color_blind ? "#598b7d" : "#3b3d3c" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Avatar alt="User" src={logoWhite} />
          <Typography variant="h6" noWrap component="a" href="/"
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
            <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" color="inherit"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu id="menu-appbar" anchorEl={anchorElNav} keepMounted open={Boolean(anchorElNav)} onClose={handleCloseNavMenu}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => { console.log("hd"); }}>{page}</MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography variant="h5" noWrap component="a" href=""
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
              <Button key={page} component={Link} to={`/${pagesLink[page]}`} onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "block" }}>
                {page}
              </Button>
            ))}
          </Box>
          {localStorage.getItem("token") ?
          <Box sx={{ marginRight: "1%" }}>
            <NotificationBell notifications={notifications} setNotifications={setNotifications} />
          </Box>
          : null }
          <Box sx={{ flexGrow: 0, alignContent: 'center' }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User" src={logoImage} />
              </IconButton>
            </Tooltip>
            <Menu id="menu-appbar" anchorEl={anchorElUser} sx={{ mt: "45px" }} keepMounted open={Boolean(anchorElUser)} onClose={handleCloseUserMenu}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => handleMenuItemClick(setting)} >
                  <Typography textAlign="center" component={Link} to={setting === "Profile" ? "/profile" : "/"}
                    onClick={() => {
                      handleCloseUserMenu();
                      switch (setting) {
                        case "Créer une mission":
                          window.location.href = "/mission/create";
                          break;
                        case "Profile":
                          navigate("/profile");
                          break;
                        case "Réglages":
                          window.location.href = "/settings";
                          break;
                        case "Déconnexion":
                          localStorage.removeItem("token");
                          localStorage.removeItem("role");
                          window.location.reload();
                          window.location.href = "/";
                          break;
                        case "Connexion":
                        case "Inscription":
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
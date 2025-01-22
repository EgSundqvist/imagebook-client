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
import ImageIcon from "@mui/icons-material/Image";
import { Link } from "react-router-dom";
import Switch from "@mui/material/Switch";
import { useTopMenu } from "../../hooks/use-topmenu";

const pages = [
  { name: "My images", path: "/home" },
  { name: "Upload", path: "/upload" },
];
const settings = [
  { name: "Profile", path: "/profile" },
  { name: "Account", path: "/account" },
  { name: "Logout", path: "/login" },
];

interface TopMenuProps {
  children: React.ReactNode;
}

const TopMenu: React.FC<TopMenuProps> = ({ children }) => {
  const {
    anchorElNav,
    anchorElUser,
    themeMode,
    userProfile,
    isAuthenticated,
    handleOpenNavMenu,
    handleOpenUserMenu,
    handleCloseNavMenu,
    handleCloseUserMenu,
    handleThemeSwitch,
    handleMenuItemClick,
  } = useTopMenu();

  return (
    <>
      <AppBar position="fixed">
        <Container maxWidth={false}>
          <Toolbar
            disableGutters
            sx={{ justifyContent: { xs: "flex-start", md: "space-between" } }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                component={Link}
                to="/login"
                sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
              >
                <ImageIcon sx={{ fontSize: 40 }} />
              </IconButton>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                component={Link}
                to="/login"
                sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
              >
                <ImageIcon sx={{ fontSize: 40 }} />
              </IconButton>
              {isAuthenticated && (
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
              )}
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
                  <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                    <Typography
                      component={Link}
                      to={page.path}
                      sx={{
                        textAlign: "center",
                        textDecoration: "none",
                        color: "inherit",
                        fontSize: "20px",
                      }}
                    >
                      {page.name}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                flexGrow: 1,
                justifyContent: "left",
              }}
            >
              {isAuthenticated &&
                pages.map((page) => (
                  <Button
                    key={page.name}
                    component={Link}
                    to={page.path}
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                      color: "white",
                      display: "block",
                    }}
                  >
                    {page.name}
                  </Button>
                ))}
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Switch
                checked={themeMode === "dark"}
                onChange={handleThemeSwitch}
                inputProps={{ "aria-label": "theme switch" }}
              />
              {userProfile && (
                <>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        alt={userProfile.username}
                        src={`/avatars/${userProfile.avatar}`}
                      />
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
                        key={setting.name}
                        onClick={() => handleMenuItemClick(setting.path)}
                      >
                        <Typography
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          {setting.name}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box component="main" sx={{ p: 3, mt: 8 }}>
        {children}
      </Box>
    </>
  );
};

export default TopMenu;

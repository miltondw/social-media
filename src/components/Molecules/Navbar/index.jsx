import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/auth";
import { UseHandles } from "./hook";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  MenuList,
  Menu,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import {
  AccountCircle,
  Notifications,
  MoreVert,
  Home,
  ExitToApp,
} from "@mui/icons-material";

export default function Navbar() {
  const { user, logout } = AuthContext();
  const navItems = ["Login", "Register"];
  const mobileMenuId = "primary-search-account-menu-mobile";
  const navigate = useNavigate();
  const { handleMobileMenuClose, handleMobileMenuOpen, mobileMoreAnchorEl } =
    UseHandles();
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const Logout = () => {
    logout();
    handleMobileMenuClose();
    navigate("/login");
  };
  const styleActive = {
    fontWeight: "bold",
    color: "#10375c",
  };
  const location = useLocation();
  console.log(location.pathname);
  const MenuLogin = (
    <List sx={{ display: "flex" }}>
      {navItems.map((item) => (
        <ListItem key={item} disablePadding>
          <NavLink
            style={({ isActive }) => (isActive ? styleActive : null)}
            to={`/${item.toLowerCase()}`}>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </NavLink>
        </ListItem>
      ))}
    </List>
  );
  const MenuUser = (
    <>
      <Link to="/notifications">
        <IconButton
          size="large"
          aria-label="show 0 new notifications"
          sx={{
            color: `${
              location.pathname === "/notifications" ? "#10375c" : "inherit"
            }`,
            transform: "scale(1.2)",
          }}>
          <Badge badgeContent={0} color="error">
            <Notifications />
          </Badge>
        </IconButton>
      </Link>
      <Link to="/profile">
        <IconButton
          size="large"
          sx={{
            color: `${
              location.pathname === "/profile" ? "#10375c" : "inherit"
            }`,
            transform: "scale(1.2)",
          }}>
          <AccountCircle />
        </IconButton>
      </Link>
      <MenuItem onClick={Logout}>
        <ExitToApp sx={{ transform: "scale(1.2)" }} />
      </MenuItem>
    </>
  );
  const MobileMenuUser = (
    <MenuList>
      <Link to={"/notifications"} onClick={handleMobileMenuClose}>
        <MenuItem>
          <IconButton
            size="large"
            aria-label="show 0 new notifications"
            color="inherit">
            <Badge badgeContent={0} color="error">
              <Notifications />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
      </Link>
      <Link to={"/profile"} onClick={handleMobileMenuClose}>
        <MenuItem>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Link>
      <MenuItem onClick={Logout}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit">
          <AccountCircle />
        </IconButton>
        <p>Logout</p>
      </MenuItem>
    </MenuList>
  );
  const MobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}>
      {user
        ? MobileMenuUser
        : navItems.map((item) => (
            <Link key={item} to={item.toLowerCase()}>
              <MenuItem>{item}</MenuItem>
            </Link>
          ))}
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/">
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}>
              {!user ? (
                <Home
                  fontSize="large"
                  sx={{
                    color: `${location.pathname === "/" ? "#10375c" : ""}`,
                  }}
                />
              ) : (
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: "1em",
                    textTransform: "capitalize",
                    fontWeight: "bold",
                  }}>
                  {user?.username}
                </Typography>
              )}
            </IconButton>
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {user ? MenuUser : MenuLogin}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit">
              <MoreVert />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {MobileMenu}
    </Box>
  );
}

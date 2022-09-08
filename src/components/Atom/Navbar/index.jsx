import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
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
} from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { AuthContext } from "../../../context/auth";
import { styledNav } from "./styledNav";
import { UseHandles } from "./hook";

const { Search, SearchIconWrapper, StyledInputBase } = styledNav();

export default function Navbar() {
  const { user, logout } = AuthContext();
  const navItems = ["Login", "Register"];
  const navigate = useNavigate();
  const {
    handleProfileMenuOpen,
    handleMobileMenuClose,
    handleMenuClose,
    handleMobileMenuOpen,
    anchorEl,
    mobileMoreAnchorEl,
  } = UseHandles();
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const Logout = () => {
    logout();
    handleMobileMenuClose();
    handleMenuClose();
    navigate("/login");
  };
  const menuId = "primary-search-account-menu";
  const location = useLocation();
  const activeStyle = {
    fontWeight: "bold",
    color: "#10375c",
  };
  const renderMenu = (
    <List sx={{ display: "flex" }}>
      {navItems.map((item) => (
        <ListItem key={item} disablePadding>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            to={`/${item.toLowerCase()}`}>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </NavLink>
        </ListItem>
      ))}
    </List>
  );
  const renderMenuUser = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}>
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={Logout}>Logout</MenuItem>
    </Menu>
  );
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
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
      {user ? (
        <MenuList>
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
          <MenuItem onClick={handleProfileMenuOpen}>
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
      ) : (
        navItems.map((item) => (
          <Link key={item} to={item.toLowerCase()}>
            <MenuItem>{item}</MenuItem>
          </Link>
        ))
      )}
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
                  sx={{ color: location.pathname === "/" ? "#10375c" : "" }}
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
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {user ? (
              <>
                <IconButton
                  size="large"
                  aria-label="show 0 new notifications"
                  color="inherit">
                  <Badge badgeContent={0} color="error">
                    <Notifications />
                  </Badge>
                </IconButton>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit">
                  <AccountCircle />
                </IconButton>
              </>
            ) : (
              renderMenu
            )}
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
      {renderMobileMenu}
      {user && renderMenuUser}
    </Box>
  );
}

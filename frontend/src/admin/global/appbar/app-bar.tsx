import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import styles from "./AdminBar.module.css";
import { AuthContext } from "../../auth/auth-provider/authProvider";

// Styled components for MUI customization
const StyledAppBar = styled(AppBar)(() => ({
  background: "linear-gradient(135deg, #1a1a1a, #2c2c2c)",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.5)",
}));

const StyledAvatar = styled(Avatar)(() => ({
  backgroundColor: "#ff4444",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#cc3333",
  },
}));

const StyledLink = styled(Link)(({ theme }) => ({
  color: "#fff",
  textDecoration: "none",
  margin: theme.spacing(0, 2),
  fontSize: "1rem",
  "&:hover": {
    color: "#ff4444",
  },
}));

const AdminBar = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Implement logout logic here (e.g., clear auth token)
    navigate("/login");
    handleMenuClose();
  };

  // Get initials from admin name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const AppBar = auth.isSignedIn() ? (
    <StyledAppBar position="static">
      <Toolbar>
        {/* Logo */}
        <Box className={styles.logoContainer}>
          <img
            src="/theatre-logo.png" // Replace with your logo path
            alt="Theatre Logo"
            className={styles.logo}
          />
        </Box>

        {/* Navigation */}
        <nav className={styles.nav}>
          <StyledLink to="/dashboard">Dashboard</StyledLink>
          <StyledLink to="/shows">Shows</StyledLink>
          <StyledLink to="/bookings">Bookings</StyledLink>
        </nav>

        {/* Spacer */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Admin Name and Avatar */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="body1" sx={{ color: "#fff" }}>
            {auth.username}
          </Typography>
          <StyledAvatar onClick={handleMenuOpen}>
            {getInitials(auth.username)}
          </StyledAvatar>
        </Box>

        {/* Dropdown Menu */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </StyledAppBar>
  ) : (
    <></>
  );

  return AppBar;
};

export default AdminBar;

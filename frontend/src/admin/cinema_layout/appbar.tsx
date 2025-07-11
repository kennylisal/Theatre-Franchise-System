import { AccountCircle } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  InputBase,
  Toolbar,
} from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
function AdminAppBar() {
  return (
    <>
      <AppBar
        position="fixed"
        elevation={6}
        sx={{ backgroundColor: "#000000" }}
      >
        <Toolbar>
          {/* Logo Placeholder */}
          <IconButton edge="start" color="inherit" aria-label="logo">
            <MovieIcon sx={{ color: "#ffffff" }} />
          </IconButton>

          {/* Navigation Links */}
          <Button color="inherit" sx={{ color: "#ffffff" }}>
            Movies
          </Button>
          <Button color="inherit" sx={{ color: "#ffffff" }}>
            Theatres
          </Button>
          <Button color="inherit" sx={{ color: "#ffffff" }}>
            Food & Drinks
          </Button>

          {/* Spacer */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Search Bar */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#ffffff",
              borderRadius: 1,
              px: 1,
            }}
          >
            <InputBase placeholder="Search…" sx={{ color: "#000000" }} />
            <IconButton sx={{ p: "10px" }} aria-label="search">
              <SearchIcon sx={{ color: "#000000" }} />
            </IconButton>
          </Box>

          {/* User Icons */}
          <IconButton color="inherit" sx={{ color: "#ffffff" }}>
            <AccountCircle />
          </IconButton>
          <IconButton color="inherit" sx={{ color: "#ffffff" }}>
            <ShoppingCartIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {/* Spacer to prevent content overlap */}
      <Toolbar />
    </>
  );
}

export default AdminAppBar;

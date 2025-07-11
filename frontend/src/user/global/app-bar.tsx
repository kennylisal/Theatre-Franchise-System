import {
  AppBar,
  Box,
  Button,
  Skeleton,
  Toolbar,
  Typography,
} from "@mui/material";
import Face5Icon from "@mui/icons-material/Face5";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ReceiptIcon from "@mui/icons-material/Receipt";
function AppBarCinemaRakyat() {
  return (
    <AppBar
      position="sticky"
      sx={{ backgroundColor: "transparent" }}
      elevation={0}
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Face5Icon sx={{ color: "black" }} fontSize="large" />
          <Typography variant="body1" color="info">
            Cinema Rakyat
          </Typography>
          <Box
            sx={{
              height: "28px",
              width: "fit-content",
              backgroundColor: "black",
              display: "flex",
              flexDirection: "row",
              paddingX: "15px",
              paddingY: "5px",
              alignItems: "center",
              marginLeft: "50px",
              borderRadius: "12px",
            }}
          >
            <LocationOnIcon sx={{ color: "white" }} fontSize="medium" />
            <Typography sx={{ color: "White" }}>MAKASSAR</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            width: 360,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ReceiptIcon sx={{ color: "black" }} fontSize="large" />
            <Typography variant="body1" color="textPrimary">
              Promo
            </Typography>
          </Box>
          <Button variant="text" color="success">
            Login
          </Button>
          <Button variant="contained">Contained</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

function SkeletonAppbar() {
  return (
    <AppBar
      position="sticky"
      sx={{ backgroundColor: "transparent" }}
      elevation={0}
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Face5Icon sx={{ color: "black" }} fontSize="large" />
          <Typography variant="body1" color="info">
            Cinema Rakyat
          </Typography>
          <Skeleton
            variant="rounded"
            width={150}
            height={50}
            sx={{ marginLeft: 5 }}
          />
        </Box>
        <Skeleton variant="rounded" width={150} height={50} />
      </Toolbar>
    </AppBar>
  );
}

export { SkeletonAppbar, AppBarCinemaRakyat };

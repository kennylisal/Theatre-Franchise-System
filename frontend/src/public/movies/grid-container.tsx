import { Box, Grid, Paper, Typography } from "@mui/material";
import type { MovieDisplay } from "./interfaces";

function GridContainer({ data }: { data: MovieDisplay }) {
  return (
    <Grid
      size={{ xs: 12, sm: 12, md: 5, lg: 4, xl: 3 }}
      height={{ xl: "575px" }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Paper
          elevation={4}
          sx={{
            backgroundColor: "white",
            height: "100%",
            marginBottom: "10px",
          }}
        >
          <img
            src={data.picture}
            alt={data.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "fill",
            }}
            onError={(e) => {
              e.currentTarget.src =
                "https://m.media-amazon.com/images/M/MV5BNGY0NGM5N2UtNzU5MS00MDAwLWFmMWEtZjE4N2Q0Y2M4YjNjXkEyXkFqcGc@._V1_.jpg"; // Fallback image
              e.currentTarget.alt = "Image not available";
            }}
          />
        </Paper>
        <Typography sx={{ color: "black", marginBottom: "10px" }}>
          {data.name}
        </Typography>
        <Grid container spacing={2} rowSpacing={1}>
          {data.genres.map((genre) => (
            <Box
              sx={{
                height: "28px",
                width: "fit-content",
                backgroundColor: "black",
                display: "inline",
                paddingX: "10px",
                alignContent: "center", //ini untuk kasih vertical
              }}
            >
              <Typography sx={{ color: "White", fontWeight: "bold" }}>
                {genre}
              </Typography>
            </Box>
          ))}
        </Grid>
      </Box>
    </Grid>
  );
}

export default GridContainer;

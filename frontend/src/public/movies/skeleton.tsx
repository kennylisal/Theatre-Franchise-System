import { Box, Container, Grid, Skeleton, Typography } from "@mui/material";
import { SkeletonAppbar } from "../../user/global/app-bar";

function SkeletonMovies() {
  return (
    <>
      <SkeletonAppbar />
      <Container maxWidth="lg" sx={{ flexGrow: 1, height: "auto" }}>
        <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
          Now Showing
        </Typography>
        <Grid container rowSpacing={5} columnSpacing={1.5}>
          <GridComponentSkeleton />
          <GridComponentSkeleton />
          <GridComponentSkeleton />
          <GridComponentSkeleton />
          <GridComponentSkeleton />
          <GridComponentSkeleton />
        </Grid>
      </Container>
    </>
  );
}

function GridComponentSkeleton() {
  return (
    <Grid size={{ sm: 7, md: 5, lg: 4, xl: 3 }} height={{ xl: "575px" }}>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Skeleton
          variant="rounded"
          sx={{ marginBottom: "10px", height: "72%" }}
        />
        <Skeleton
          variant="rectangular"
          height={15}
          sx={{ marginBottom: "10px" }}
        />

        <Grid container spacing={2} rowSpacing={1}>
          <Skeleton variant="rectangular" width={45} height={20} />
          <Skeleton variant="rectangular" width={45} height={20} />
        </Grid>
      </Box>
    </Grid>
  );
}

export default SkeletonMovies;

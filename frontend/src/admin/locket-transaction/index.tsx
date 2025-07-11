import { Container, Grid, Skeleton, Typography } from "@mui/material";
// import type { TransactionMovieShowing } from "./interface";

function LocketTransaction() {
  //   const movies = [
  //     {
  //       id: 1,
  //       title: "The Matrix Resurrections",
  //       poster:
  //         "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg/",
  //       showtimes: ["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM"],
  //     },
  //     {
  //       id: 2,
  //       title: "Spider-Man: No Way Home",
  //       poster: "https://via.placeholder.com/200x300?text=Spider-Man+Poster",
  //       showtimes: ["11:00 AM", "2:00 PM", "5:00 PM", "8:00 PM"],
  //     },
  //     {
  //       id: 3,
  //       title: "Dune: Part Two",
  //       poster: "https://via.placeholder.com/200x300?text=Dune+Poster",
  //       showtimes: ["12:00 PM", "3:00 PM", "6:00 PM", "9:00 PM"],
  //     },
  //   ];
  return (
    <Container
      maxWidth={false}
      sx={{
        minHeight: "100vh",
        bgcolor: "#18181B",
        py: 4,
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        align="center"
        color="#FFFFFF"
        gutterBottom
        sx={{ mb: 4 }}
      >
        Movies Playing Today
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        <TransactionMovieScheduleSkeletons />
      </Grid>
    </Container>
  );
}

// function GenerateMainContent({
//   movies,
// }: {
//   movies: TransactionMovieShowing[];
// }) {
//   return (
//     <>
//       {movies.map((movie) => (
//         <Grid size={{ md: 9, lg: 8, xl: 5 }} key={movie.movie}>
//           <Paper
//             elevation={3}
//             sx={{
//               p: 3,
//               bgcolor: "#1F1F23",
//               borderRadius: 2,
//               color: "#FFFFFF",
//               transition: "transform 0.2s",
//               "&:hover": {
//                 transform: "scale(1.01)",
//                 boxShadow: 6,
//               },
//             }}
//           >
//             <Box
//               sx={{
//                 display: "flex",
//                 flexDirection: { xs: "column", md: "row" },
//                 alignItems: { xs: "center", md: "flex-start" },
//                 gap: 3,
//               }}
//             >
//               {/* Left: Title and Showtimes */}
//               <Box sx={{ flex: 1, textAlign: { xs: "center", md: "left" } }}>
//                 <Typography variant="h4" fontWeight="bold" gutterBottom>
//                   {movie.movie_name}
//                 </Typography>
//                 <Typography variant="body1" color="#EFEEF1" gutterBottom>
//                   Showtimes:
//                 </Typography>
//                 <Box
//                   sx={{
//                     display: "flex",
//                     flexWrap: "wrap",
//                     gap: 1,
//                     justifyContent: { xs: "center", md: "flex-start" },
//                   }}
//                 >
//                   {movie.showtimes.map((time, index) => (
//                     <Button
//                       key={index}
//                       variant="outlined"
//                       size="large"
//                       sx={{
//                         color: "#FFFFFF",
//                         borderColor: "#4B4B4F",
//                         bgcolor: "#4B4B4F",
//                         "&:hover": {
//                           borderColor: "#9147FF",
//                           bgcolor: "#9147FF",
//                         },
//                       }}
//                     >
//                       {time.started_at}
//                     </Button>
//                   ))}
//                 </Box>
//               </Box>
//               {/* Right: Poster */}
//               <Box
//                 sx={{
//                   flexShrink: 0,
//                   width: { xs: "100%", md: 130, lg: 150 },
//                   maxWidth: 160,
//                   display: { xs: "none", sm: "none", md: "block" },
//                 }}
//               >
//                 <Paper
//                   elevation={6}
//                   sx={{
//                     borderRadius: 2,
//                     overflow: "hidden",
//                     transition: "transform 0.2s",
//                     "&:hover": {
//                       transform: "translateY(-4px)",
//                     },
//                   }}
//                 >
//                   <img
//                     src={movie.movie_image}
//                     alt={`${movie.movie_name} Poster`}
//                     style={{
//                       width: "100%",
//                       height: "auto",
//                       display: "block",
//                     }}
//                   />
//                 </Paper>
//               </Box>
//             </Box>
//           </Paper>
//         </Grid>
//       ))}
//       {movies.length % 2 === 1 ? (
//         <Grid size={{ md: 9, lg: 8, xl: 5 }} key="odd-placeholder"></Grid>
//       ) : (
//         <></>
//       )}
//     </>
//   );
// }

function TransactionMovieScheduleSkeletons() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, index) => (
        <Grid size={{ md: 9, lg: 8, xl: 5 }} key={`iskele${index}`}>
          <Skeleton variant="rounded" sx={{ height: "300px", width: "100%" }} />
        </Grid>
      ))}
    </>
  );
}

export default LocketTransaction;

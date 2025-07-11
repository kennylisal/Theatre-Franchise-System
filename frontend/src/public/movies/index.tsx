import { useState, useEffect } from "react";
import { Typography, Grid, Container } from "@mui/material";
import SkeletonMovies from "./skeleton";
import GridContainer from "./grid-container";
import axios from "axios";
import { generateMovieDisplayData } from "./utils";
import type { MovieDisplay } from "./interfaces";
import { AppBarCinemaRakyat } from "../../user/global/app-bar";

// Main App component
function MoviesView() {
  // const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [movieData, setMovieData] = useState([] as MovieDisplay[]);
  // Simulate data fetching
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/movies/activeMovies"
        );
        setLoading(false);
        const data = generateMovieDisplayData(response.data);
        setMovieData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>{loading ? <SkeletonMovies /> : <MainContent datas={movieData} />}</>
  );
}

function MainContent({ datas }: { datas: MovieDisplay[] }) {
  return (
    <>
      <AppBarCinemaRakyat />
      <Container maxWidth="lg" sx={{ flexGrow: 1, height: "auto" }}>
        <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
          Now Showing
        </Typography>
        <Grid container rowSpacing={5} columnSpacing={1.5}>
          {datas.map((data) => (
            <GridContainer data={data} />
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default MoviesView;

import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import type { MovieObject } from "../../../public/movies/interfaces";

const GenerateMoviesForModal = (
  datas: MovieObject[],
  isTerpilih: number,

  handleClickMovie: (arg1: number, arg2: MovieObject) => void
) =>
  datas.map((data, index) => (
    <ActiveMovieItem
      key={data.movie_id}
      durasi={data.movie_duration}
      imgSource={data.movie_image}
      judul={data.movie_name}
      isTerpilih={isTerpilih === index ? "" : undefined}
      onClickMovie={() => handleClickMovie(index, data)}
    />
  ));

const GenerateMovieListSkeleton = (
  <>
    <ActiveMovieSkeleton />
    <ActiveMovieSkeleton />
    <ActiveMovieSkeleton />
    <ActiveMovieSkeleton />
  </>
);

function ActiveMovieItem({
  judul,
  durasi,
  imgSource,
  isTerpilih,
  onClickMovie,
}: {
  judul: string;
  durasi: number;
  imgSource: string;
  isTerpilih: string | undefined;
  onClickMovie: () => void;
}) {
  return (
    <Card
      elevation={3}
      sx={{ display: "flex", height: "60px", marginY: "6px" }}
    >
      <CardActionArea
        data-active={isTerpilih}
        onClick={onClickMovie}
        sx={{
          display: "flex",
          height: "100%",
          "&[data-active]": {
            backgroundColor: "action.selected",
            "&:hover": {
              backgroundColor: "action.selectedHover",
            },
          },
        }}
      >
        <Box sx={{ width: "20%" }}>
          <CardMedia
            component="img"
            sx={{ height: "100%" }}
            image={imgSource}
          />
        </Box>
        <Stack direction="column" marginX="10px" sx={{ width: "80%" }}>
          <Typography
            variant="body1"
            align="justify"
            color="primary"
            overflow="clip"
          >
            {judul}
          </Typography>
          <Typography variant="body1" align="justify">
            Durasi : {durasi} Menit
          </Typography>
        </Stack>
      </CardActionArea>
    </Card>
  );
}

function ActiveMovieSkeleton() {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      width="auto"
      marginBottom="10px"
    >
      <Box sx={{ width: "20%", height: "65px", marginRight: "10px" }}>
        <Skeleton
          variant="rectangular"
          height="100%"
          width="70px"
          sx={{ marginBottom: "10px" }}
        />
      </Box>
      <Stack direction="column" width="80%" spacing={1.5}>
        <Skeleton variant="rectangular" width="auto" height={20} />
        <Skeleton variant="rectangular" width="60px" height={20} />
      </Stack>
    </Stack>
  );
}

export {
  ActiveMovieItem,
  ActiveMovieSkeleton,
  GenerateMoviesForModal as GenerateMoviesForModal,
  GenerateMovieListSkeleton as GenerateMovieListSkeleton,
};

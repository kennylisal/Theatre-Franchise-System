import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import type {
  CinemaScheduleHeader,
  NewScheduleType,
} from "../interfaces/interfaces";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import InfoIcon from "@mui/icons-material/Info";
import type React from "react";
function HeaderSection({
  judul,
  cinemaId,
  setSelectedCinema,
  handleModalOpen,
}: {
  judul: string;
  cinemaId: string;
  setSelectedCinema: React.Dispatch<React.SetStateAction<string>>;
  handleModalOpen: () => void;
}) {
  const openModalHandler = () => {
    setSelectedCinema(cinemaId);
    handleModalOpen();
  };
  return (
    <Stack direction="row" alignItems="center">
      <Typography variant="h4" fontWeight="bold">
        {judul}
      </Typography>
      <IconButton
        color="primary"
        aria-label="add to shopping cart"
        onClick={openModalHandler}
      >
        <AddCircleIcon sx={{ fontSize: "40px" }} />
      </IconButton>
    </Stack>
  );
}

function MovieScheduleGridItem({
  judul,
  awalTayang,
  akhirTayang,
  harga,
  onClick,
  imgSrc,
}: {
  judul: string;
  awalTayang: string;
  akhirTayang: string;
  harga: string;
  onClick: () => void;
  imgSrc: string;
}) {
  return (
    <Grid size={{ xs: 12, sm: 12, md: 5, lg: 4, xl: 3 }}>
      <Paper
        sx={{ backgroundColor: "#b9a3e3", height: "100%", width: "90%" }}
        elevation={8}
      >
        <Stack direction="row" paddingX={1.5} paddingY={1.5}>
          <img
            style={{
              height: "170px",
              objectFit: "fill",
              borderRadius: "8px",
            }}
            src={imgSrc}
            // src="https://m.media-amazon.com/images/M/MV5BNGY0NGM5N2UtNzU5MS00MDAwLWFmMWEtZjE4N2Q0Y2M4YjNjXkEyXkFqcGc@._V1_.jpg" // Fallback image
          />
          <Stack justifyContent="space-between" sx={{ paddingLeft: "10px" }}>
            <Typography
              variant="body1"
              sx={{
                color: "black",
                width: "100%",
                display: "-webkit-box",
                overflow: "hidden",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 3,
              }}
              fontWeight="bold"
              align="justify"
            >
              {judul}
            </Typography>
            <Stack direction="row" width="100%" alignItems="center">
              <Box
                sx={{
                  height: "28px",
                  width: "fit-content",
                  backgroundColor: "#262626",
                  display: "inline",
                  paddingX: "10px",
                  alignContent: "center", //ini untuk kasih vertical
                }}
              >
                <Typography sx={{ color: "White", fontWeight: "bold" }}>
                  {awalTayang}
                </Typography>
              </Box>
              <Typography
                sx={{ color: "black", fontWeight: "bold", mx: "15px" }}
              >
                -
              </Typography>
              <Box
                sx={{
                  height: "28px",
                  width: "fit-content",
                  backgroundColor: "#262626",
                  display: "inline",
                  paddingX: "10px",
                  alignContent: "center", //ini untuk kasih vertical
                }}
              >
                <Typography sx={{ color: "White", fontWeight: "bold" }}>
                  {akhirTayang}
                </Typography>
              </Box>
            </Stack>
            <Box
              sx={{
                height: "28px",
                width: "fit-content",
                backgroundColor: "#6441a5",
                display: "inline",
                paddingX: "10px",
                alignContent: "center", //ini untuk kasih vertical
              }}
            >
              <Typography sx={{ color: "#f1f1f1", fontWeight: "bold" }}>
                {harga}
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={onClick}
              sx={{ marginY: "4px" }}
            >
              Edit
            </Button>
            <Button variant="contained" color="secondary" onClick={onClick}>
              Seating
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Grid>
  );
}

function TidakAdaJadwal({ namaCinema }: { namaCinema: string }) {
  return (
    <Grid container rowSpacing={5} columnSpacing={1.5} marginBottom="30px">
      <Grid size={{ xs: 12, sm: 12, md: 5, lg: 4, xl: 3 }}>
        <Paper
          sx={{ backgroundColor: "#ffffd6", height: "100%" }}
          elevation={8}
        >
          <Stack direction="row" paddingX={1.5} paddingY={1.5}>
            <IconButton color="primary" aria-label="add to shopping cart">
              <InfoIcon sx={{ fontSize: "45px", color: "red" }} />
            </IconButton>
            <Stack justifyContent="center" sx={{ paddingLeft: "10px" }}>
              <Typography
                variant="h5"
                sx={{ color: "black" }}
                fontWeight="bold"
                align="justify"
              >
                Belum Tersedia Jadwal Untuk {namaCinema}
              </Typography>
            </Stack>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
}

function ScheduleContent({
  handleModalOpen,
  scheduleData,
  setSelectedCinema,
  setSelectedUpdateMovie,
  handleOpenModalUpdate,
}: {
  handleModalOpen: () => void;
  scheduleData: Map<string, CinemaScheduleHeader>;
  setSelectedCinema: React.Dispatch<React.SetStateAction<string>>;
  handleOpenModalUpdate: () => void;
  setSelectedUpdateMovie: (args1: NewScheduleType) => void;
}) {
  const display = Array.from(scheduleData.keys()).map((key) => {
    const CinemaMovies =
      scheduleData.get(key)?.detail.length == 0 ? (
        <TidakAdaJadwal
          namaCinema={scheduleData.get(key)?.cinema_name ?? "Cinema_error"}
        />
      ) : (
        <Grid
          container
          rowSpacing={5}
          columnSpacing={1.5}
          marginBottom="30px"
          paddingX="10px"
        >
          {scheduleData.get(key)?.detail.map((data) => (
            <MovieScheduleGridItem
              key={data.movie_schedule_id}
              judul={data.movieName ?? "error"}
              awalTayang={data.timeStart?.substring(11, 16) ?? "error"}
              akhirTayang={data.timeEnd?.substring(11, 16) ?? "error"}
              harga={data.price?.toString() ?? "error"}
              imgSrc={data.movieImage ?? ""}
              onClick={() => {
                const movieProp: NewScheduleType = {
                  movieId: data.movieId ?? "error",
                  movieName: data.movieName ?? "error",
                  price: data.price ?? -1,
                  timeStart: data.timeStart,
                  timeEnd: data.timeEnd,
                  movieImage: data.movieImage ?? "error",
                  cinema: key,
                  movie_schedule_id: data.movie_schedule_id,
                };
                setSelectedUpdateMovie(movieProp);
                handleOpenModalUpdate();
              }}
            />
          ))}
        </Grid>
      );
    return (
      <>
        <HeaderSection
          judul={scheduleData.get(key)!.cinema_name}
          cinemaId={scheduleData.get(key)!.cinema_id}
          setSelectedCinema={setSelectedCinema}
          handleModalOpen={handleModalOpen}
        />
        {CinemaMovies}
      </>
    );
  });
  return display;
}

export {
  TidakAdaJadwal,
  HeaderSection,
  MovieScheduleGridItem,
  ScheduleContent,
};

import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { Dayjs } from "dayjs";
import { useContext, useState, type ChangeEvent, type FormEvent } from "react";
import type {
  FormModalProps,
  NewScheduleType,
  ScheduleMovieProp,
} from "../interfaces/interfaces";
import CircularLoading from "../../global/loading-component/circularLoading";
import SnackBarContext from "../../global/snackbar/snackbar-context";
import { sendNewSchedule } from "./services";
import {
  GenerateMovieListSkeleton,
  GenerateMoviesForModal,
} from "./modal-component";
import type { MovieObject } from "../../../public/movies/interfaces";
const wait = () => new Promise((resolve) => setTimeout(resolve, 1500));
function FormModalCreate({
  open,
  movieData,
  movieDataHasLoad,
  cinemaId,
  handleClose,
  setScheduleData,
  tglPilihan,
}: FormModalProps) {
  const [formData, setFormData] = useState<ScheduleMovieProp>({
    movieName: "",
    hargaTiket: 0,
    awalWaktu: null,
    akhirWaktu: null,
    movieId: "",
    movieImage: "",
  });

  const [filmPilihan, setFilmPilihan] = useState(0);
  const [isSendingData, setIsSendingData] = useState(false);
  const { showSnackBar } = useContext(SnackBarContext);
  const handleClickMovie = (index: number, movieData: MovieObject) => {
    setFormData({
      ...formData,
      movieName: movieData.movie_name,
      movieId: movieData.movie_id,
      movieImage: movieData.movie_image,
    });
    setFilmPilihan(index);
  };
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "hargaTiket" ? Number(value) || 0 : value,
    });
  };
  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsSendingData(true);
    const addSuccessful = await sendNewSchedule(formData, cinemaId);
    await wait();
    if (addSuccessful.isSuccessful) {
      addScheduleOffline(formData, cinemaId, addSuccessful.id);
      cleanData();
      showSnackBar("Berhasil ditambahkan", "success");
      handleClose();
    } else {
      showSnackBar("gagal ditambahkan", "error");
    }
    setIsSendingData(false);
  };

  const addScheduleOffline = (
    formData: ScheduleMovieProp,
    cinemaId: string,
    movieScheduleId: string
  ) => {
    const body: NewScheduleType = {
      movieId: formData.movieId,
      timeStart: formData.awalWaktu!.format("YYYY-MM-DDTHH:mm"),
      timeEnd: formData.akhirWaktu!.format("YYYY-MM-DDTHH:mm"),
      price: formData.hargaTiket,
      cinema: cinemaId,
      movieName: formData.movieName,
      movieImage: formData.movieImage,
      movie_schedule_id: movieScheduleId,
    };

    setScheduleData((prev) => {
      const baru = new Map(prev);
      baru.get(cinemaId)?.detail.push(body);
      return baru;
    });
  };

  const cleanData = () => {
    setFormData({
      movieName: "",
      hargaTiket: 0,
      awalWaktu: null,
      akhirWaktu: null,
      movieId: "",
      movieImage: "",
    });
  };

  const setAwalTayang = (value: Dayjs | null) => {
    setFormData({ ...formData, awalWaktu: value });
  };
  const setAkhirTayang = (value: Dayjs | null) => {
    setFormData({ ...formData, akhirWaktu: value });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: 400 }, // Responsive width
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        {isSendingData ? (
          <CircularLoading text="Mengirim Data" />
        ) : (
          <MainContent
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            movieData={movieData}
            movieDataHasLoad={movieDataHasLoad}
            filmPilihan={filmPilihan}
            handleClickMovie={handleClickMovie}
            setAwalTayang={setAwalTayang}
            setAkhirTayang={setAkhirTayang}
            handleClose={handleClose}
            tglPilihan={tglPilihan}
          />
        )}
      </Box>
    </Modal>
  );
}

const MainContent = ({
  formData,
  movieData,
  movieDataHasLoad,
  filmPilihan,
  tglPilihan,
  handleInputChange,
  handleSubmit,
  handleClickMovie,
  setAwalTayang,
  setAkhirTayang,
  handleClose,
}: {
  formData: ScheduleMovieProp;
  movieData: MovieObject[];
  movieDataHasLoad: boolean;
  filmPilihan: number;
  tglPilihan: Dayjs;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  handleClickMovie: (index: number, movieData: MovieObject) => void;
  setAwalTayang: (value: Dayjs | null) => void;
  setAkhirTayang: (value: Dayjs | null) => void;
  handleClose: () => void;
}) => (
  <>
    <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
      Add Movie Schedule
    </Typography>
    <TextField
      id="input-with-icon-textfield"
      label="TextField"
      size="small"
      slotProps={{
        input: {
          startAdornment: <SearchIcon />,
        },
      }}
      variant="standard"
    />
    <Box
      width="auto"
      height="250px"
      sx={{
        flexDirection: "column",
        overflowY: "scroll",
        marginTop: "15px",
      }}
    >
      {movieDataHasLoad
        ? GenerateMoviesForModal(movieData, filmPilihan, handleClickMovie)
        : GenerateMovieListSkeleton}
    </Box>
    <TextField
      fullWidth
      label="Movie Name"
      name="movieName"
      margin="normal"
      value={formData.movieName}
      required
      disabled
    />
    <TextField
      fullWidth
      label="Harga Tiket"
      name="hargaTiket"
      margin="normal"
      type="number"
      sx={{ marginBottom: "20px" }}
      required
      value={formData.hargaTiket}
      onChange={handleInputChange}
    />
    <Stack direction="row" spacing={2}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePicker
          label="Uncontrolled picker"
          name="awalWaktu"
          defaultValue={tglPilihan.startOf("day")}
          onChange={(newValue) => {
            setAwalTayang(newValue);
          }}
        />
        <TimePicker
          label="Controlled picker"
          name="akhirWaktu"
          defaultValue={tglPilihan.startOf("day")}
          onChange={(newValue) => {
            setAkhirTayang(newValue);
          }}
        />
      </LocalizationProvider>
    </Stack>

    <form onSubmit={handleSubmit}>
      <Stack
        direction="row"
        spacing={2}
        sx={{ mt: 3, justifyContent: "flex-end" }}
      >
        <Button variant="outlined" onClick={handleClose}>
          Cancel
        </Button>
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Stack>
    </form>
  </>
);

export default FormModalCreate;

import { useContext, useState, type ChangeEvent, type FormEvent } from "react";
import type {
  CinemaScheduleHeader,
  FormModalUpdateProps,
  NewScheduleType,
} from "../interfaces/interfaces";
import dayjs, { Dayjs } from "dayjs";
import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CircularLoading from "../../global/loading-component/circularLoading";
import SearchIcon from "@mui/icons-material/Search";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { GenerateMoviesForModal } from "../create/modal-component";
import SnackBarContext from "../../global/snackbar/snackbar-context";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { updateMovieSchedule } from "./services";
import type { MovieObject } from "../../../public/movies/interfaces";
const wait = () => new Promise((resolve) => setTimeout(resolve, 1500));

function FormModalUpdate({
  open,
  handleClose,
  setScheduleData,
  movieProp: movieScheduleProp,
  movieData,
}: FormModalUpdateProps) {
  const [isSendingData, setIsSendingData] = useState(false);
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
            setScheduleData={setScheduleData}
            handleClose={handleClose}
            movieProp={movieScheduleProp}
            movieData={movieData}
            setIsSendingData={setIsSendingData}
          />
        )}
      </Box>
    </Modal>
  );
}

const MainContent = ({
  movieData,
  movieProp,
  handleClose,
  setScheduleData,
  setIsSendingData,
}: {
  movieData: MovieObject[];
  movieProp: NewScheduleType | undefined;
  handleClose: () => void;
  setScheduleData: React.Dispatch<
    React.SetStateAction<Map<string, CinemaScheduleHeader>>
  >;
  setIsSendingData: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [formData, setFormData] = useState<NewScheduleType>(movieProp!);
  const [filmPilihan, setFilmPilihan] = useState(-1);
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
  const setAwalTayang = (value: Dayjs | null) => {
    setFormData({ ...formData, timeStart: value!.format("YYYY-MM-DDTHH:mm") });
  };
  const setAkhirTayang = (value: Dayjs | null) => {
    setFormData({ ...formData, timeEnd: value!.format("YYYY-MM-DDTHH:mm") });
  };
  const updateScheduleOffline = () => {
    const body: NewScheduleType = {
      movieId: formData.movieId,
      timeStart: formData.timeStart,
      timeEnd: formData.timeEnd,
      price: formData.price,
      cinema: formData.cinema,
      movieName: formData.movieName,
      movieImage: formData.movieImage,
      movie_schedule_id: formData.movie_schedule_id,
    };

    setScheduleData((prev) => {
      const baru = new Map<string, CinemaScheduleHeader>();
      prev.forEach((value, key) => {
        baru.set(key, {
          cinema_id: value.cinema_id,
          cinema_name: value.cinema_name,
          detail: value.detail.map((data) =>
            data.movie_schedule_id === body.movie_schedule_id ? body : data
          ),
        });
      });
      return baru;
    });
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsSendingData(true);
    const isUpdateSuccessful = await updateMovieSchedule(formData);
    // const isUpdateSuccessful = true;
    await wait();
    if (isUpdateSuccessful) {
      updateScheduleOffline();
      showSnackBar("Schedule film berhasil diperbarui", "success");
      handleClose();
    } else {
      showSnackBar("Gagal perbarui data", "error");
    }
    setIsSendingData(false);
  };
  return (
    <>
      <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
        Update Movie Schedule
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
        {GenerateMoviesForModal(movieData, filmPilihan, handleClickMovie)}
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
        name="price"
        margin="normal"
        type="number"
        sx={{ marginBottom: "20px" }}
        required
        value={formData.price}
        onChange={handleInputChange}
      />
      <Stack direction="row" spacing={2}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Uncontrolled picker"
            name="awalWaktu"
            defaultValue={dayjs(formData?.timeStart)}
            onChange={(newValue) => {
              setAwalTayang(newValue);
            }}
          />
          <TimePicker
            label="Controlled picker"
            name="akhirWaktu"
            defaultValue={dayjs(formData?.timeEnd)}
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
};

export default FormModalUpdate;

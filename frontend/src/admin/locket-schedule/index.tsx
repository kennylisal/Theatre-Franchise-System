import {
  useContext,
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import type { GetAllEmployeeDataType } from "../employee/interfaces";
import type { CreateScheduleType, LocketSchedule } from "./interfaces";
import dayjs, { Dayjs } from "dayjs";
import { createNewSchedule, getAllEmployee, getSchedule } from "./services";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import SnackBarContext from "../global/snackbar/snackbar-context";
import wait from "../global/loading-component/wait";
import PilihanTanggal from "../movie-schedule/main-page/pilihan-tanggal";

function WorkScheduleView() {
  const locket: {
    display: string;
    value: string;
  }[] = [
    { display: "loket 1", value: "LK1" },
    { display: "loket 2", value: "LK2" },
  ];
  const jadwal: {
    display: string;
    value: string;
  }[] = [
    { display: "siang", value: "siang" },
    { display: "malam", value: "malam" },
  ];

  const awalDataForm = {
    employeeId: "",
    timeStart: "",
    timeEnd: "",
    theatre: "xxaxx",
    locketName: "",
    jadwal: "",
  };
  const tglAwal = dayjs().startOf("day");
  const [isLoading, setIsLoading] = useState(false);
  const [allEmployee, setAllEmployee] = useState<GetAllEmployeeDataType[]>([]);
  const [schedulePilihan, setSchedulePilihan] = useState<LocketSchedule[]>([]);
  const [tglPilihan, setTglPilihan] = useState<Dayjs>(tglAwal);
  const [dataForm, setDataForm] = useState<CreateScheduleType>(awalDataForm);
  const { showSnackBar } = useContext(SnackBarContext);
  useEffect(() => {
    const loadAwal = async () => {
      try {
        const allEmployeeData = await getAllEmployee();
        const scheduleData = await getSchedule(tglPilihan.format("YYYY-MM-DD"));
        setAllEmployee(allEmployeeData.data || []); // Handle case where data might not exist
        setSchedulePilihan(scheduleData.data || []); // Handle case where data might not exist
        console.log(scheduleData);
      } catch (error) {
        console.log("Error loading initial data:", error);
      }
    };
    loadAwal();
  }, []);
  const handleSubmitSchedule = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await createNewSchedule(dataForm);
    if (result.success) {
      showSnackBar("Berhasil tambah schedule", "success");
      cleanData();
    } else {
      showSnackBar("Gagal tambah schedule", "error");
    }
    wait();
    setIsLoading(false);
  };
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
    if (name === "jadwal") {
      if (value === "siang") {
        setDataForm({
          ...dataForm,
          timeStart: tglPilihan.format("YYYY-MM-DD") + "T11:00",
          timeEnd: tglPilihan.format("YYYY-MM-DD") + "T17:00",
        });
      } else {
        setDataForm({
          ...dataForm,
          timeStart: tglPilihan.format("YYYY-MM-DD") + "T17:00",
          timeEnd: tglPilihan.format("YYYY-MM-DD") + "T22:00",
        });
      }
    }
  };

  const cleanData = () => setDataForm(awalDataForm);
  const handleGantitanggal = (tangalBaru: Dayjs) => setTglPilihan(tangalBaru);
  return (
    <Container
      maxWidth="lg"
      sx={{ flexGrow: 1, height: "auto", backgroundColor: "beige", py: "12px" }}
    >
      <Stack
        direction="row"
        alignContent="space-evenly"
        justifyContent="space-evenly"
      >
        <Box
          sx={{
            height: "500px",
            width: "45%",
          }}
        >
          <Typography id="modal-title" variant="h5" component="h2" gutterBottom>
            Create Schedule
          </Typography>

          <Box
            sx={{
              height: "100px",
              width: "520px",
              backgroundColor: "black",
              overflow: "auto",
            }}
          >
            <PilihanTanggal
              tanggalAwal={tglAwal}
              tanggalPilihan={tglPilihan}
              handleChangeDate={handleGantitanggal}
            />
          </Box>
          <Box
            sx={{
              px: "8px",
              py: "5px",
              border: "2px solid black",
              borderRadius: "10px",
            }}
          >
            <form onSubmit={handleSubmitSchedule}>
              <TextField
                fullWidth
                select
                label="Pilih Employee"
                value={dataForm.employeeId} // Controlled component
                onChange={handleInputChange}
                name="employeeId"
                helperText="Pilih Tugas Employee"
                variant="filled"
              >
                {allEmployee.length > 0 ? (
                  allEmployee.map((data) => (
                    <MenuItem key={data.employee_id} value={data.employee_id}>
                      {data.employee_name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled value="">
                    No employees available
                  </MenuItem>
                )}
              </TextField>
              <TextField
                fullWidth
                select
                label="Pilih Jadwal"
                defaultValue={jadwal[0].value}
                helperText="Pilih Tugas Employee"
                variant="filled"
                onChange={handleInputChange}
                name="jadwal"
                value={dataForm.jadwal}
              >
                {jadwal.map((data) => (
                  <MenuItem key={data.value} value={data.value}>
                    {data.display}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                select
                label="Pilih loket"
                defaultValue={locket[0].value}
                helperText="Pilih loket kerja"
                variant="filled"
                onChange={handleInputChange}
                name="locketName"
                value={dataForm.locketName}
              >
                {locket.map((data) => (
                  <MenuItem key={data.value} value={data.value}>
                    {data.display}
                  </MenuItem>
                ))}
              </TextField>
              {isLoading ? (
                <CircularProgress size="3.2rem" />
              ) : (
                <Button type="submit" variant="contained">
                  Submit
                </Button>
              )}
            </form>
          </Box>
        </Box>
        <Box
          sx={{
            height: "500px",
            width: "50%",
            backgroundColor: "lightgray",
          }}
        >
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Loket</TableCell>
                  <TableCell align="center">Tanggal </TableCell>
                  <TableCell align="center">Awal&nbsp;(WITA)</TableCell>
                  <TableCell align="center">Akhir&nbsp;(WITA)</TableCell>
                  <TableCell>Employee</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {schedulePilihan.map((row) => (
                  <TableRow key={row.schedule_id}>
                    <TableCell>{row.locket_name}</TableCell>
                    <TableCell align="center">
                      {row.started_at.substring(0, 10)}
                    </TableCell>
                    <TableCell align="center">
                      {row.started_at.substring(11, 16)}
                    </TableCell>
                    <TableCell align="center">
                      {row.end_at.substring(11, 16)}
                    </TableCell>
                    <TableCell>{row.employee_name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Stack>
    </Container>
  );
}

export default WorkScheduleView;

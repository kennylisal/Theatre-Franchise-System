import {
  Box,
  Container,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getWorkSchedule } from "./services";
import type { EmployeeWorkSchduleType } from "./interfaces";
import wait from "../../admin/global/loading-component/wait";

function EmployeeLocketkSchedule() {
  const [workSchedules, setWorkSchedules] = useState<EmployeeWorkSchduleType[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  // const auth = useContext(AuthContext);
  // console.log(auth);
  useEffect(() => {
    const getSchedule = async () => {
      const data = await getWorkSchedule();
      await wait();
      if (data.success) {
        setWorkSchedules(data.data);
        setIsLoading(false);
      }
    };
    getSchedule();
  }, []);
  return (
    <Container
      maxWidth="lg"
      sx={{ flexGrow: 1, height: "auto", backgroundColor: "beige", py: "12px" }}
    >
      <Typography variant="h3" gutterBottom>
        Halaman Jadwal Employe
      </Typography>
      {isLoading ? (
        <Skeleton variant="rounded" height={182} />
      ) : (
        generateTable(workSchedules)
      )}
    </Container>
  );
}

function generateTable(data: EmployeeWorkSchduleType[]) {
  return (
    <Box sx={{ overflow: "auto" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Loket</TableCell>
              <TableCell align="center">Tanggal </TableCell>
              <TableCell align="center">Awal&nbsp;(WITA)</TableCell>
              <TableCell align="center">Akhir&nbsp;(WITA)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.schedule_id}>
                <TableCell align="left">{row.locket_name}</TableCell>
                <TableCell align="center">
                  {row.started_at.substring(0, 10)}
                </TableCell>
                <TableCell align="center">
                  {row.started_at.substring(11, 16)}
                </TableCell>
                <TableCell align="center">
                  {row.end_at.substring(11, 16)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
export default EmployeeLocketkSchedule;

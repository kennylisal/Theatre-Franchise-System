import {
  Box,
  Button,
  Container,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import type { CreateEmployeeDataType, JenisEmployee } from "./interfaces";
import { useContext, useState, type ChangeEvent, type FormEvent } from "react";
import SnackBarContext from "../global/snackbar/snackbar-context";
import { requestAddEmployee } from "./services";

function EmployeeView() {
  const jenisEmployee: JenisEmployee[] = [
    {
      display: "ADMIN FRANCHISE",
      roleCode: "ER001",
    },
    {
      display: "PEGAWAI FRANCHISE",
      roleCode: "ER002",
    },
    {
      display: "PENJAGA PINTU",
      roleCode: "ER003",
    },
  ];
  const dataAwal: CreateEmployeeDataType = {
    acc_status: "active",
    action: "Create Employee",
    adminId: "lisal_admin",
    location: "xxaxx",
    name: "",
    password: "",
    role: "ER002",
  };
  const [createEmpployeeData, setEmplData] =
    useState<CreateEmployeeDataType>(dataAwal);
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setEmplData({
      ...createEmpployeeData,
      [name]: value,
    });
  };
  const cleanData = () => {
    setEmplData(dataAwal);
  };
  const { showSnackBar } = useContext(SnackBarContext);
  const handleAddEmployeeFormSubmit = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    // console.log(createEmpployeeData);
    const isrequestSuceess = await requestAddEmployee(createEmpployeeData);
    if (isrequestSuceess) {
      showSnackBar("Employee Berhasil Ditambah", "success");
      cleanData();
    } else {
      showSnackBar("Penambahan Employee gagal", "error");
    }
  };

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
            width: "50%",
          }}
        >
          <Typography id="modal-title" variant="h5" component="h2" gutterBottom>
            Tambah Employee
          </Typography>
          <Box
            sx={{
              px: "8px",
              py: "5px",
              border: "2px solid black",
              borderRadius: "10px",
            }}
          >
            <form onSubmit={handleAddEmployeeFormSubmit}>
              <TextField
                fullWidth
                label="Nama Employee"
                name="name"
                margin="normal"
                required
                onChange={handleInputChange}
                value={createEmpployeeData.name}
              />
              <TextField
                fullWidth
                label="Password Employee"
                name="password"
                margin="normal"
                required
                onChange={handleInputChange}
                value={createEmpployeeData.password}
              />
              <TextField
                fullWidth
                select
                label="Role Employee"
                defaultValue="EP01"
                helperText="Pilih Tugas Employee"
                variant="filled"
                onChange={handleInputChange}
                name="role"
                value={createEmpployeeData.role}
              >
                {jenisEmployee.map((option) => (
                  <MenuItem key={option.roleCode} value={option.roleCode}>
                    {option.display}
                  </MenuItem>
                ))}
              </TextField>
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </form>
          </Box>
        </Box>
        <Box
          sx={{
            backgroundColor: "black",
            height: "500px",
            width: "50%",
          }}
        ></Box>
      </Stack>
    </Container>
  );
}

export default EmployeeView;

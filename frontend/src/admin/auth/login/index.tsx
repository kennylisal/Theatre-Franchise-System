import {
  Box,
  Button,
  CircularProgress,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useState, type ChangeEvent, type FormEvent } from "react";
import type { LoginRequestType } from "./interface";
import wait from "../../global/loading-component/wait";
import { adminLogin } from "./services";
import SnackBarContext from "../../global/snackbar/snackbar-context";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const dataAwal = {
    username: "",
    password: "",
  };
  const [isLoading, setIsLoading] = useState(false);
  const { showSnackBar } = useContext(SnackBarContext);
  const [formData, setFormData] = useState<LoginRequestType>(dataAwal);
  const navigate = useNavigate();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const payload = await adminLogin(formData.username, formData.password);
    if (payload.success) {
      showSnackBar("Berhasil login", "success");
      navigate("/verifAccount", { replace: true });
    } else {
      showSnackBar("gagal login", "error");
    }
    await wait();
    setIsLoading(false);
  };
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const data = e.target;
    setFormData({
      ...formData,
      [data.name]: data.value,
    });
  };
  return (
    <Container
      maxWidth="md"
      sx={{
        flexGrow: 1,
        height: "auto",
        backgroundColor: "beige",
        py: "20px",
      }}
    >
      <Typography id="modal-title" variant="h5" component="h2" gutterBottom>
        Login Page
      </Typography>
      <Box
        sx={{
          px: "8px",
          py: "5px",
          border: "2px solid black",
          borderRadius: "10px",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Stack spacing={2} py={2} alignItems="center">
            <TextField
              fullWidth
              label="Username"
              name="username"
              variant="filled"
              type="text"
              required
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              variant="filled"
              type="password"
              onChange={handleInputChange}
            />
            {isLoading ? (
              <CircularProgress size="3.2rem" />
            ) : (
              <Button
                type="submit"
                variant="contained"
                sx={{ width: "400px" }}
                size="large"
              >
                Submit
              </Button>
            )}
          </Stack>
        </form>
      </Box>
    </Container>
  );
}

export default LoginPage;

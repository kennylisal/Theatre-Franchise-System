import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import type { Dayjs } from "dayjs";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { signUpFormSchema } from "./interfaces";
import dayjs from "dayjs";
import SnackBarContext from "../../../admin/global/snackbar/snackbar-context";
import { signupUser } from "./services";

function UserSignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    dateOfBirth: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  // const { login } = useAuth();
  const { showSnackBar } = useContext(SnackBarContext);
  const navigate = useNavigate();

  const cleanData = () =>
    setFormData((prev) => {
      return {
        name: "",
        username: "",
        email: prev.email,
        password: "",
        dateOfBirth: "",
      };
    });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date: Dayjs | null) => {
    setFormData((prev) => ({
      ...prev,
      dateOfBirth: date ? date.format("YYYY-MM-DD") : "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = signUpFormSchema.validate(formData, {
      abortEarly: false,
    });

    if (error) {
      const errorMap: { [key: string]: string } = {};
      error.details.forEach((err) => {
        errorMap[err.path[0]] = err.message;
      });
      setErrors(errorMap);
      return;
    }
    setIsloading(true);
    try {
      const response = await signupUser(formData);
      if (response.isSuccess) {
        showSnackBar(response.message, "success");
        cleanData();
      } else {
        showSnackBar(response.message, "error");
      }
    } catch (error) {
      console.log(error);
      showSnackBar("terjadi kesalahan program", "error");
    }
    setIsloading(false);
    console.log(formData);
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        minHeight: "100vh",
        bgcolor: "#18181B",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: 400,
          width: "100%",
          bgcolor: "#1F1F23",
          borderRadius: 2,
          color: "#FFFFFF",
        }}
      >
        <Typography variant="h5" fontWeight="bold" align="center" gutterBottom>
          Join Theatre Tickets
        </Typography>
        <Typography variant="body2" align="center" color="#EFEEF1" mb={3}>
          Create an account to reserve your seats!
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            margin="normal"
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                bgcolor: "#4B4B4F",
                color: "#FFFFFF",
                "& fieldset": { borderColor: "#4B4B4F" },
                "&:hover fieldset": { borderColor: "#9147FF" },
                "&.Mui-focused fieldset": { borderColor: "#9147FF" },
              },
              "& .MuiInputLabel-root": { color: "#EFEEF1" },
              "& .MuiInputLabel-root.Mui-focused": { color: "#FFFFFF" },
            }}
          />
          <TextField
            fullWidth
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            error={!!errors.username}
            helperText={errors.username}
            margin="normal"
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                bgcolor: "#4B4B4F",
                color: "#FFFFFF",
                "& fieldset": { borderColor: "#4B4B4F" },
                "&:hover fieldset": { borderColor: "#9147FF" },
                "&.Mui-focused fieldset": { borderColor: "#9147FF" },
              },
              "& .MuiInputLabel-root": { color: "#EFEEF1" },
              "& .MuiInputLabel-root.Mui-focused": { color: "#FFFFFF" },
            }}
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            margin="normal"
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                bgcolor: "#4B4B4F",
                color: "#FFFFFF",
                "& fieldset": { borderColor: "#4B4B4F" },
                "&:hover fieldset": { borderColor: "#9147FF" },
                "&.Mui-focused fieldset": { borderColor: "#9147FF" },
              },
              "& .MuiInputLabel-root": { color: "#EFEEF1" },
              "& .MuiInputLabel-root.Mui-focused": { color: "#FFFFFF" },
            }}
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            margin="normal"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    sx={{ color: "#EFEEF1" }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                bgcolor: "#4B4B4F",
                color: "#FFFFFF",
                "& fieldset": { borderColor: "#4B4B4F" },
                "&:hover fieldset": { borderColor: "#9147FF" },
                "&.Mui-focused fieldset": { borderColor: "#9147FF" },
              },
              "& .MuiInputLabel-root": { color: "#EFEEF1" },
              "& .MuiInputLabel-root.Mui-focused": { color: "#FFFFFF" },
            }}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date of Birth"
              value={dayjs(formData.dateOfBirth)}
              onChange={handleDateChange}
              sx={{
                width: "100%",
                mt: 2,

                "& .MuiOutlinedInput-root": {
                  bgcolor: "#4B4B4F",
                  color: "#FFFFFF",
                  border: "1px #EFEEF1 solid",
                  "& fieldset": { borderColor: "#4B4B4F" },
                  "&:hover fieldset": { borderColor: "#9147FF" },
                  "&.Mui-focused fieldset": { borderColor: "#9147FF" },
                },
                "& .MuiInputLabel-root": { color: "#EFEEF1" },
                "& .MuiInputLabel-root.Mui-focused": { color: "#FFFFFF" },
                "& .MuiButtonBase-root": { color: "#EFEEF1" },
                "& .MuiPickersSectionList-root": { color: "#EFEEF1" },
              }}
              slotProps={{
                textField: {
                  error: !!errors.dateOfBirth,
                  helperText: errors.dateOfBirth,
                },
              }}
            />
          </LocalizationProvider>
          <Stack
            width="100%"
            direction="row"
            alignContent="center"
            justifyContent="center"
            my="10px"
          >
            {isLoading ? (
              <CircularProgress
                size="2.5rem"
                sx={{ color: "#9147FF", bgcolor: "#9147FF" }}
              />
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  bgcolor: "#9147FF",
                  color: "#FFFFFF",
                  fontWeight: "bold",
                  "&:hover": { bgcolor: "#7B3FE4" },
                }}
              >
                Sign Up
              </Button>
            )}
          </Stack>
          <Typography variant="body2" align="center" color="#EFEEF1">
            Already have an account?{" "}
            <Link
              onClick={() => navigate("/loginUser", { replace: true })}
              color="#9147FF"
            >
              Log in
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default UserSignUpPage;

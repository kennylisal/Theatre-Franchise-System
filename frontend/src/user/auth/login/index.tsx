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
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginFormSchema, type LoginFormType } from "./interface";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { loginUser } from "./services";
import SnackBarContext from "../../../admin/global/snackbar/snackbar-context";
function UserLogin() {
  const dataFormAwal = {
    username: "",
    password: "",
  };
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] = useState<LoginFormType>(dataFormAwal);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { showSnackBar } = useContext(SnackBarContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = loginFormSchema.validate(formData, { abortEarly: false });
    if (error) {
      const errorMap: { [key: string]: string } = {};
      error.details.forEach((err) => {
        errorMap[err.path[0]] = err.message;
      });
      setErrors(errorMap);
    }
    setIsLoading(true);
    const response = await loginUser(formData);
    if (response.isSuccess) {
      navigate("/verifAccount", { replace: true });
    } else {
      showSnackBar(response.message, "error");
    }
    // try {
    // } catch (error) {}
    setIsLoading(false);
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
          Login Page
        </Typography>
        <Typography variant="body2" align="center" color="#EFEEF1" mb={3}>
          Login to reserve your seats!
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            fullWidth
            label="Username"
            name="username"
            type="text"
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
            Don't have an account?{" "}
            <Link
              onClick={() => navigate("/loginUser", { replace: true })}
              color="#9147FF"
            >
              Sign up
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default UserLogin;

import { CircularProgress, Container, Stack, Typography } from "@mui/material";
import { checkVerification } from "./services";
import { Navigate } from "react-router-dom";
import wait from "../../global/loading-component/wait";

function AuthVerificationPage() {
  const verifikasiUser = async () => {
    const data = await checkVerification();
    if (data.success) {
      return <Navigate to="/movieSchedule" replace />;
    } else {
      <Navigate to="/login" replace />;
    }
  };
  wait();
  verifikasiUser();
  return (
    <Container maxWidth="lg">
      <Stack
        alignItems="center"
        justifyContent="center"
        minWidth={700}
        minHeight={700}
      >
        <CircularProgress size="10rem" />
        <Typography id="modal-title" variant="h2" gutterBottom>
          Verifikasi Akun
        </Typography>
      </Stack>
    </Container>
  );
}

export default AuthVerificationPage;

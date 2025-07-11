import { CircularProgress, Container, Stack, Typography } from "@mui/material";
import wait from "../../../admin/global/loading-component/wait";
import { Navigate } from "react-router-dom";
import { checkUserVerification } from "./services";

function AuthVerificationPage() {
  const verifikasiUser = async () => {
    const data = await checkUserVerification();
    if (data.success) {
      return <Navigate to="/" replace />;
    } else {
      <Navigate to="/" replace />;
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

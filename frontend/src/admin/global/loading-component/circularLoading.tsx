import { CircularProgress, Stack, Typography } from "@mui/material";

function CircularLoading({ text }: { text: string }) {
  return (
    <Stack
      display="flex"
      justifyContent="start"
      spacing="1rem"
      alignContent="center"
      direction="row"
    >
      <CircularProgress size="3.2rem" />
      <Typography id="modal-title" variant="h4" component="h2" gutterBottom>
        {text}
      </Typography>
    </Stack>
  );
}

export default CircularLoading;

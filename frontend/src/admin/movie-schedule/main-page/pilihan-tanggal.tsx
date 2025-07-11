import { Box, ButtonBase, Paper, Stack, Typography } from "@mui/material";
import { Dayjs } from "dayjs";

const PilihanTanggal = ({
  tanggalAwal,
  tanggalPilihan,
  handleChangeDate,
}: {
  tanggalAwal: Dayjs;
  tanggalPilihan: Dayjs;
  handleChangeDate: (tangalBaru: Dayjs) => void;
}) => {
  return (
    <Box
      sx={{
        backgroundColor: "#ededed",
        py: "12px",
        px: "15px",
        mx: "auto",
        width: "fit-content",
      }}
    >
      <Stack direction="row" spacing={2}>
        {Array.from({ length: 8 }).map((_, index) => {
          const assignedDate = tanggalAwal.add(index, "day");
          return PilihanTanggalAtas(
            assignedDate.date() === tanggalPilihan.date(),
            assignedDate,
            handleChangeDate
          );
        })}
      </Stack>
    </Box>
  );
};

const PilihanTanggalAtas = (
  terpilih: boolean,
  day: Dayjs,
  handleChangeDate: (tangalBaru: Dayjs) => void
) => {
  const StyleTerpilihWrapper: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => (
    <Box
      sx={{
        backgroundColor: "white",
        px: "14px",
        py: "5px",
        border: "1px solid black",
      }}
    >
      {children}
    </Box>
  );

  const StyleNormalWrapper: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => (
    <ButtonBase onClick={() => handleChangeDate(day)}>
      <Paper key="xx" elevation={6} sx={{ px: "14px", py: "5px" }}>
        {children}
      </Paper>
    </ButtonBase>
  );

  const content = (
    <Stack
      direction="row"
      spacing={1}
      sx={{ justifyContent: "center", alignItems: "center" }}
    >
      <Stack>
        <Typography fontWeight="bold">{day.format("MMM")}</Typography>
        <Typography fontWeight="bold">{day.format("ddd")}</Typography>
      </Stack>
      <Typography variant="h3">{`${
        day.date() < 10 ? "0" : ""
      }${day.date()}`}</Typography>
    </Stack>
  );
  return terpilih ? (
    <StyleTerpilihWrapper>{content}</StyleTerpilihWrapper>
  ) : (
    <StyleNormalWrapper>{content}</StyleNormalWrapper>
  );
};

export default PilihanTanggal;

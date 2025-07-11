import React, { useState, type JSX } from "react";
import {
  Container,
  Box,
  Stack,
  TextField,
  Button,
  Avatar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Grid,
  Paper,
  List,
  ListItem,
  ThemeProvider,
  createTheme,
  styled,
} from "@mui/material";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
import type { LayoutGeneratorType, RowSchemaForm } from "./interface";
import type { Seating } from "../seating/interface";
import AdminAppBar from "./appbar";

// Styled component for animated row entry
const AnimatedStack = styled(Stack)({
  animation: "slideIn 0.5s ease-in-out",
  "@keyframes slideIn": {
    from: { transform: "translateY(-20px)", opacity: 0 },
    to: { transform: "translateY(0)", opacity: 1 },
  },
});

// Custom theme inspired by AMC Theatres (light version)
const theme = createTheme({
  palette: {
    primary: {
      main: "#D32F2F", // Dark red for buttons and app bar
    },
    secondary: {
      main: "#FFC1C1", // Light red for accents
    },
    background: {
      default: "#F5F5F5", // Light gray background
      paper: "#FFFFFF", // White for paper elements
    },
    text: {
      primary: "#212121", // Dark text for readability
      secondary: "#757575",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

// Placeholder form validation function (replace with actual implementation)
const checkFormError = (
  form: RowSchemaForm,
  setErrors: (errors: { [key: string]: string }) => void
) => {
  const errors: { [key: string]: string } = {};
  if (!form.length || form.length <= 0) {
    errors.length = "Length must be greater than 0";
  }
  setErrors(errors);
  return Object.keys(errors).length === 0;
};

function CinemaLayoutExperiment() {
  const formDataAwal: RowSchemaForm = { length: 0 };
  const [layoutSchema, setLayoutSchema] = useState<LayoutGeneratorType[]>([]);
  const [rowForm, setRowForm] = useState<RowSchemaForm>(formDataAwal);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRowForm((prev) => ({ ...prev, [name]: parseInt(value) || 0 }));
  };

  const gantiModeLane = () => {
    // Placeholder for lane mode toggle
  };

  const arrLetter: string[] = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
  ];

  const addRow = () => {
    const isFormValid = checkFormError(rowForm, setErrors);
    if (isFormValid) {
      setLayoutSchema((prev) => [
        ...prev,
        {
          length: rowForm.length,
          row: arrLetter[prev.length],
          sequence: [],
        },
      ]);
      setRowForm(formDataAwal); // Reset form after adding
    }
  };

  const copyRow = (rowIndex: string) => {
    const rowOrder = arrLetter.findIndex((e) => e === rowIndex);
    setLayoutSchema((prev) => [
      ...prev,
      {
        length: prev[rowOrder].length,
        row: arrLetter[prev.length],
        sequence: prev[rowOrder].sequence,
      },
    ]);
  };

  const deleteRow = (rowIndex: string) => {
    setLayoutSchema((prev) => prev.filter((item) => item.row !== rowIndex));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl" sx={{ py: 2 }}>
        {/* App Bar */}
        <AdminAppBar />

        <Grid container spacing={2}>
          {/* Main Content */}
          <Grid size={{ xs: 9 }}>
            <Paper
              sx={{
                backgroundColor: "background.paper",
                p: 2,
                borderRadius: 1,
                maxHeight: "700px",
                overflow: "auto",
              }}
            >
              {/* Form */}
              <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                <TextField
                  label="Length"
                  name="length"
                  value={rowForm.length}
                  onChange={handleChange}
                  error={!!errors.length}
                  helperText={errors.length}
                  variant="outlined"
                  size="small"
                />
                <Button onClick={addRow} variant="contained" color="primary">
                  Buat
                </Button>
                <Button
                  onClick={gantiModeLane}
                  variant="contained"
                  color="primary"
                >
                  Buat Skema
                </Button>
              </Stack>

              {/* Screen Representation */}
              <Box sx={{ textAlign: "center", mb: 2 }}>
                <Typography variant="h5" color="text.secondary">
                  Screen
                </Typography>
                <Box
                  sx={{
                    height: "20px",
                    bgcolor: "grey.300",
                    borderRadius: "10px 10px 0 0",
                  }}
                />
              </Box>

              {/* Seating Layout */}
              <RowSeatsLayoutV3
                seatings={layoutSchema}
                setLayoutSchema={setLayoutSchema}
                copyRow={copyRow}
                deleteRow={deleteRow}
              />
            </Paper>
          </Grid>

          {/* Search Sidebar */}
          <Grid size={{ xs: 3 }}>
            <Paper sx={{ p: 2, height: "100%" }}>
              <Typography variant="h6" gutterBottom>
                Search Layouts
              </Typography>
              <TextField
                label="Search"
                variant="outlined"
                fullWidth
                size="small"
                sx={{ mb: 2 }}
              />
              <List dense>
                <ListItem>Layout 1</ListItem>
                <ListItem>Layout 2</ListItem>
                <ListItem>Layout 3</ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

function RowSeatsLayoutV3({
  seatings,
  setLayoutSchema,
  copyRow,
  deleteRow,
}: {
  deleteRow: (arg1: string) => void;
  copyRow: (arg1: string) => void;
  seatings: LayoutGeneratorType[];
  setLayoutSchema: React.Dispatch<React.SetStateAction<LayoutGeneratorType[]>>;
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>, row: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  return (
    <>
      {seatings.map((seat) => {
        let ctr = 0;
        let dynamicLength = seat.length;
        const returnedElement: JSX.Element[] = [];
        seat.sequence.forEach((e) => {
          while (ctr < e - 1) {
            const seatingInfo: Seating = {
              rowName: seat.row,
              seat_id: `${seat.row}${ctr + 1}`,
              seat: `${ctr + 1}`,
              status: "available",
            };
            returnedElement.push(
              <SeatingBoxV2
                key={seatingInfo.seat_id}
                rowName={seatingInfo.rowName}
                seatingInfo={seatingInfo}
                setLayoutSchema={setLayoutSchema}
              />
            );
            ctr++;
            if (ctr >= dynamicLength) break;
          }
          const seatingInfo: Seating = {
            rowName: seat.row,
            seat_id: `${seat.row}${ctr + 1}X`,
            seat: "XX",
            status: "lane",
          };
          returnedElement.push(
            <SeatingBoxV2
              key={seatingInfo.seat_id}
              rowName={seatingInfo.rowName}
              seatingInfo={seatingInfo}
              setLayoutSchema={setLayoutSchema}
            />
          );
          dynamicLength--;
          ctr++;
        });
        while (ctr < dynamicLength) {
          const seatingInfo: Seating = {
            rowName: seat.row,
            seat_id: `${seat.row}${ctr + 1}`,
            seat: `${ctr + 1}`,
            status: "available",
          };
          returnedElement.push(
            <SeatingBoxV2
              key={seatingInfo.seat_id}
              rowName={seatingInfo.rowName}
              seatingInfo={seatingInfo}
              setLayoutSchema={setLayoutSchema}
            />
          );
          ctr++;
        }

        return (
          <AnimatedStack
            key={seat.row}
            direction="row"
            spacing={1}
            sx={{ mb: 1 }}
          >
            <IconButton onClick={(e) => handleClick(e, seat.row)} size="small">
              <Avatar sx={{ width: 40, height: 40, bgcolor: "secondary.main" }}>
                <Typography color="text.primary" variant="h6" fontWeight="bold">
                  {seat.row}
                </Typography>
              </Avatar>
            </IconButton>
            {returnedElement}
            <Menu
              anchorEl={anchorEl}
              open={open && selectedRow === seat.row}
              onClose={handleClose}
              slotProps={{
                paper: {
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "&::before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={() => copyRow(seat.row)}>Copy</MenuItem>
              <MenuItem onClick={() => deleteRow(seat.row)}>Delete</MenuItem>
            </Menu>
          </AnimatedStack>
        );
      })}
    </>
  );
}

function SeatingBoxV2({
  seatingInfo,
  setLayoutSchema,
  rowName,
}: {
  rowName: string;
  seatingInfo: Seating;
  setLayoutSchema: React.Dispatch<React.SetStateAction<LayoutGeneratorType[]>>;
}) {
  const colorCode: Record<string, string> = {
    available: "#BDBDBD", // Light gray
    unavailable: "#616161", // Darker gray
    hover: "#FFC1C1", // Light red (theme secondary)
    lane: "#FFFFFF", // White
    "on-maintenance": "#D32F2F", // Dark red (theme primary)
  };

  const onClick = () => {
    if (seatingInfo.status === "available") {
      setLayoutSchema((prev) =>
        prev.map((e) =>
          e.row === rowName
            ? {
                ...e,
                sequence: [
                  ...e.sequence,
                  Number.parseInt(seatingInfo.seat),
                ].sort((a, b) => a - b),
              }
            : e
        )
      );
    }
  };

  return (
    <Box
      onClick={onClick}
      sx={{
        width: "45px",
        height: "45px",
        bgcolor: colorCode[seatingInfo.status],
        border: "1px solid black",
        borderRadius: "5px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: "transform 0.2s, background-color 0.2s",
        ...(seatingInfo.status === "available" && {
          "&:hover": {
            bgcolor: colorCode.hover,
            transform: "scale(1.05)",
            cursor: "pointer",
          },
        }),
      }}
    >
      <Typography
        color={
          seatingInfo.status === "available" || seatingInfo.status === "lane"
            ? "text.primary"
            : "common.white"
        }
        variant="body2"
        fontWeight="bold"
      >
        {seatingInfo.seat === "XX" ? "" : seatingInfo.seat}
      </Typography>
    </Box>
  );
}

export default CinemaLayoutExperiment;

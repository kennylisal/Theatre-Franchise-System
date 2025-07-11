import { useState, type JSX } from "react";
import type { Seating } from "../seating/interface";
import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  rowFormSchema,
  type LayoutGeneratorType,
  type RowSchemaForm,
} from "./interface";
import { checkFormError } from "./utils";
import React from "react";

function CinemaLayoutMaker() {
  const formDataAwal: RowSchemaForm = {
    length: 0,
  };

  const [layoutSchema, setLayoutSchema] = useState<LayoutGeneratorType[]>([]);
  const [rowForm, setRowForm] = useState<RowSchemaForm>(formDataAwal);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRowForm((prev) => ({ ...prev, [name]: value }));
  };
  const gantiModeLane = () => {};
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
    const isFormValid = checkFormError(rowFormSchema, rowForm, setErrors);
    if (isFormValid) {
      setLayoutSchema((prev) => [
        ...prev,
        {
          length: rowForm.length,
          row: arrLetter[prev.length],
          sequence: [],
        },
      ]);
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
    <Container maxWidth="lg" sx={{ flexGrow: 1, height: "auto" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          maxHeight: "700px",
          backgroundColor: "bisque",
          padding: 2,
          overflow: "auto",
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          marginBottom={2}
          justifyContent="space-between"
          width="100%"
        >
          <TextField
            label="length"
            name="length"
            value={rowForm.length}
            onChange={handleChange}
            error={!!errors.length}
            helperText={errors.length}
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
          <Button
            onClick={addRow}
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
            Buat
          </Button>
          <Button
            onClick={gantiModeLane}
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
            Buat Skema
          </Button>
        </Stack>
        <RowSeatsLayoutV3
          seatings={layoutSchema}
          setLayoutSchema={setLayoutSchema}
          copyRow={copyRow}
          deleteRow={deleteRow}
        />
      </Box>
    </Container>
  );
}

//index yg dipencet -> urutan asli - sequence.length
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
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {seatings.map((seat) => {
        let ctr = 0;
        let dynamicLength = seat.length;
        const returnedElement: JSX.Element[] = [];
        seat.sequence.forEach((e) => {
          console.log(e);
          while (ctr < e - 1) {
            const seatingInfo: Seating = {
              rowName: seat.row,
              seat_id: `${seat.row}${ctr + 1}`,
              seat: `${ctr + 1}`,
              status: "available",
            };
            returnedElement.push(
              <SeatingBoxV2
                rowName={seatingInfo.rowName}
                seatingInfo={seatingInfo}
                setLayoutSchema={setLayoutSchema}
              />
            );
            ctr++;
            if (ctr > dynamicLength) {
              break;
            }
          }
          const seatingInfo: Seating = {
            rowName: seat.row,
            seat_id: `${seat.row}${ctr + 1}X`,
            seat: `XX`,
            status: "lane",
          };
          returnedElement.push(
            <SeatingBoxV2
              rowName={seatingInfo.rowName}
              seatingInfo={seatingInfo}
              setLayoutSchema={setLayoutSchema}
            />
          );
          dynamicLength--;
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
              rowName={seatingInfo.rowName}
              seatingInfo={seatingInfo}
              setLayoutSchema={setLayoutSchema}
            />
          );
          ctr++;
        }
        return (
          <Stack direction="row" spacing={1} sx={{ marginBottom: "10px" }}>
            <IconButton
              onClick={handleClick}
              size="medium"
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar sx={{ width: 40, height: 40 }}>
                <Typography color="black" variant="h4" fontWeight="bold">
                  {seat.row}
                </Typography>
              </Avatar>
            </IconButton>

            {...returnedElement}
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              slotProps={{
                paper: {
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
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
              <MenuItem
                onClick={() => {
                  copyRow(seat.row);
                  setAnchorEl(null);
                }}
              >
                Copy
              </MenuItem>
              <MenuItem
                onClick={() => {
                  deleteRow(seat.row);
                  setAnchorEl(null);
                }}
              >
                Delete
              </MenuItem>
            </Menu>
          </Stack>
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
    available: "#2ed41a",
    unavailable: "#616161",
    hover: "#e5ef14",
    lane: "#ffffff",
    "on-maintenance": "red",
  };
  const onClick = () => {
    console.log(seatingInfo);
    setLayoutSchema((prev) => {
      return prev.map((e) => {
        return e.row === rowName
          ? ({
              ...e,
              sequence: [...e.sequence, Number.parseInt(seatingInfo.seat)].sort(
                (a, b) => a - b
              ),
            } as LayoutGeneratorType)
          : e;
      });
    });
  };
  const styleTambahan =
    seatingInfo.status === "lane"
      ? {
          backgroundColor: colorCode[seatingInfo.status],
          border: "1px solid black",
          borderRadius: "5px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          "&:hover": {
            backgroundColor: colorCode.hover,
            cursor: "pointer",
          },
        }
      : {
          backgroundColor: colorCode[seatingInfo.status],
          border: "1px solid black",
          borderRadius: "5px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          ...(seatingInfo.status === "available" && {
            "&:hover": {
              backgroundColor: colorCode.hover,
              cursor: "pointer",
            },
          }),
        };
  return (
    <Box
      onClick={onClick}
      sx={{
        width: "45px", // Wider than parent to trigger horizontal scrolling
        height: "45px", // Taller than parent to trigger vertical scrolling
        ...styleTambahan,
      }}
    >
      <Typography
        color={seatingInfo.status === "unavailable" ? "black" : "white"}
        variant="body1"
        fontWeight="bold"
      >
        {seatingInfo.seat === "XX" ? "" : seatingInfo.seat}
      </Typography>
    </Box>
  );
}

export default CinemaLayoutMaker;

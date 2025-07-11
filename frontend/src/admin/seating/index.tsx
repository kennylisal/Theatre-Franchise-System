import { Box, Container, Stack, Typography } from "@mui/material";
import { type BuyedSeating, type RowSchema, type Seating } from "./interface";
import { useEffect, useState } from "react";
import { getSeatingSchema } from "./services";

function SeatingSchemaView() {
  const [rowSchema, setRowSchema] = useState<RowSchema[]>([]);
  const [buyeInfo, setBuyedInfo] = useState<
    Map<string, "available" | "lane" | "unavailable" | "on-maintenance">
  >(new Map());
  const buyed: BuyedSeating[] = [
    {
      buyed_seating_id: 1,
      transaction_id: "x",
      movie_schedule_id: "xx0tSM",
      keterangan: "unavailable",
      seating_id: "E5",
    },
    {
      buyed_seating_id: 1,
      transaction_id: "x",
      movie_schedule_id: "xx0tSM",
      keterangan: "unavailable",
      seating_id: "E6",
    },
    {
      buyed_seating_id: 1,
      transaction_id: "x",
      movie_schedule_id: "xx0tSM",
      keterangan: "on-maintenance",
      seating_id: "C10",
    },
  ];
  useEffect(() => {
    const loadData = async () => {
      const hasil = await getSeatingSchema("xx00001");
      console.log(hasil);
      setRowSchema(hasil);
    };
    loadData();
    const x = new Map<
      string,
      "available" | "lane" | "unavailable" | "on-maintenance"
    >(buyed.map((data) => [data.seating_id, data.keterangan]));
    setBuyedInfo(x);
  }, []);
  return (
    <>
      <Container maxWidth="md" sx={{ flexGrow: 1, height: "auto" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            maxHeight: "600px",
            backgroundColor: "bisque",
            padding: 2,
            overflow: "auto",
          }}
        >
          <RowSeats seatings={rowSchema} buyedSeating={buyeInfo}></RowSeats>
        </Box>
      </Container>
    </>
  );
}

function RowSeats({
  seatings,
  buyedSeating,
}: {
  seatings: RowSchema[];
  buyedSeating: Map<
    string,
    "available" | "lane" | "unavailable" | "on-maintenance"
  >;
}) {
  return (
    <>
      {seatings.map((seat) => (
        <Stack direction="row" spacing={1} sx={{ marginBottom: "10px" }}>
          <Typography color="black" variant="h4" fontWeight="bold">
            {seat.row}
          </Typography>
          {seat.column.map((column) => {
            if (buyedSeating.has(column.seat_id)) {
              return (
                <SeatingBox
                  seatingInfo={{
                    rowName: seat.row,
                    seat: column.seat,
                    seat_id: column.seat_id,
                    status:
                      buyedSeating.get(column.seat_id) ?? "on-maintenance",
                  }}
                />
              );
            } else {
              return <SeatingBox seatingInfo={column} />;
            }
          })}
        </Stack>
      ))}
    </>
  );
}

function SeatingBox({ seatingInfo }: { seatingInfo: Seating }) {
  const colorCode: Record<string, string> = {
    available: "#2ed41a",
    unavailable: "#616161",
    hover: "#e5ef14",
    lane: "#ffffff",
    "on-maintenance": "red",
  };

  const onClick = () => {
    console.log(seatingInfo);
  };
  const styleTambahan =
    seatingInfo.status === "lane"
      ? {}
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
        width: "40px", // Wider than parent to trigger horizontal scrolling
        height: "40px", // Taller than parent to trigger vertical scrolling
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

export default SeatingSchemaView;

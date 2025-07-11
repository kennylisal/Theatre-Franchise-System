interface ScheduleSeating {
  seating_schema: RowSchema[];
}

interface RowSchema {
  row: string;
  column: Seating[];
}

interface Seating {
  seat: string;
  status: "available" | "lane" | "unavailable" | "on-maintenance";
  seat_id: string;
  rowName: string;
}

interface BuyedSeating {
  buyed_seating_id: number;
  transaction_id: string;
  movie_schedule_id: string;
  keterangan: "available" | "lane" | "unavailable" | "on-maintenance";
  seating_id: string;
}
// kuning -> hover
//ijo -> tersedia
//merah -> on-maintenance
//grey -> sudah dibeli
//transparent -> melayang

export {
  type RowSchema,
  type Seating,
  type ScheduleSeating,
  type BuyedSeating,
};

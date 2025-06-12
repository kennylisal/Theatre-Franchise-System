interface CreateScheduleType {
  employeeId: string;
  timeStart: string;
  timeEnd: string;
  theatre: string;
  locketName: string;
}

interface EmployeeWorkSchduleType {
  started_at: string;
  end_at: string;
  locket_name: string;
  schedule_id: string;
}

export { type CreateScheduleType as CreateMovieType, EmployeeWorkSchduleType };

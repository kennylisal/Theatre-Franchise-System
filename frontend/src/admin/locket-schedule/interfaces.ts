interface LocketSchedule {
  employee_name: string;
  locket_name: string;
  started_at: string;
  end_at: string;
  schedule_id: string;
}
interface CreateScheduleType {
  employeeId: string;
  timeStart: string;
  timeEnd: string;
  theatre: string;
  locketName: string;
  jadwal: string;
}
export { type LocketSchedule, type CreateScheduleType };

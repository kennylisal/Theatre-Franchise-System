import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import TheatreAdminRouter from "./routing";
import { BrowserRouter } from "react-router-dom";
// import LoginPage from "./admin/auth/login";
// import WorkScheduleView from "./admin/locket-schedule";
// import EmployeeView from "./admin/employee";
// import MovieScheduleView from "./admin/movie-schedule/index.tsx";
// import SnackBarProvider from "./admin/global/snackbar-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <TheatreAdminRouter />
    </BrowserRouter>
  </StrictMode>
);

// "username" : "ADMIN TSM",
// "newPassword" : "tsm0909"

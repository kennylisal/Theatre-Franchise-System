import { Route, Routes } from "react-router-dom";
import LoginPage from "../admin/auth/login";
import NotFound from "../admin/global/not-found/not-found";
import { AuthProvider } from "../admin/auth/auth-provider/authProvider";
import MovieScheduleView from "../admin/movie-schedule";
// import ProtectedRoute from "./protected-route";
import AdminBar from "../admin/global/appbar/app-bar";

import AuthVerificationPage from "../admin/auth/verif-page";
import SnackBarProvider from "../admin/global/snackbar/snackbar-provider";
import MoviesView from "../public/movies";
import EmployeeLocketkSchedule from "../employee/locket-scehdule";
import UserSignUpPage from "../user/auth/signup";
import UserLogin from "../user/auth/login";
import LocketTransaction from "../admin/locket-transaction";
import CinemaLayoutExperiment from "../admin/cinema_layout/expreminet";

function TheatreAdminRouter() {
  return (
    <AuthProvider>
      <SnackBarProvider>
        <AdminBar />
        <Routes>
          <Route path="/" element={<LoginPage />} />

          <Route path="/admin">
            <Route path="movies" element={<MoviesView />} />
            <Route path="verifAccount" element={<AuthVerificationPage />} />

            <Route
              path="locketSchedule"
              element={<EmployeeLocketkSchedule />}
            />
            <Route path="locketTransaction" element={<LocketTransaction />} />
            <Route path="cinemaMaker" element={<CinemaLayoutExperiment />} />
          </Route>
          <Route path="/user">
            {/* harusnya ada verif-account disini */}
            <Route path="signup" element={<UserSignUpPage />} />
            <Route path="login" element={<UserLogin />} />
            <Route
              path="movieSchedule"
              element={
                // <ProtectedRoute>
                //   <MovieScheduleView />
                // </ProtectedRoute>
                <MovieScheduleView />
              }
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </SnackBarProvider>
    </AuthProvider>
  );
}

export default TheatreAdminRouter;

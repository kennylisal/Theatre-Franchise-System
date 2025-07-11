import { Box, Container } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import {
  type ModalDataProp,
  type CinemaScheduleHeader,
  type NewScheduleType,
} from "./interfaces/interfaces";
import PilihanTanggal from "./main-page/pilihan-tanggal";
import { MovieScheduleSkeleton } from "./main-page/skeleton";

import { ScheduleContent } from "./main-page/schedule-section";
import SnackBarContext from "../global/snackbar/snackbar-context";
import FormModalCreate from "./create/form-modal";
import {
  fetchCinemaScheduleData,
  fetchModalMovies,
} from "./main-page/services";
import FormModalUpdate from "./update/form-moda";
import dayjs, { Dayjs } from "dayjs";
import wait from "../global/loading-component/wait";
import type { MovieObject } from "../../public/movies/interfaces";

function MovieScheduleView() {
  const isInitialRender = useRef(true);
  const [selectedUpdateMovie, setSelectedUpdateMovie] =
    useState<NewScheduleType>();
  const [modalMovies, setModalMovies] = useState<MovieObject[]>([]);
  const [modalData, setModalData] = useState<ModalDataProp>({
    open: false,
    movieDataHasLoad: false,
  });

  const handleSelectUpdateMovies = (movieScheduleProp: NewScheduleType) => {
    setSelectedUpdateMovie(movieScheduleProp);
  };
  const handleModalOpen = () =>
    setModalData({
      ...modalData,
      open: true,
    });
  const handleModalClose = () =>
    setModalData({
      ...modalData,
      open: false,
    });
  const [modalUpdateData, setModalUpdateData] = useState<ModalDataProp>({
    open: false,
    movieDataHasLoad: true,
  });
  const handleModalUpdateOpen = () =>
    setModalUpdateData({ ...modalUpdateData, open: true });
  const handleModalUpdateClose = () =>
    setModalUpdateData({ ...modalUpdateData, open: false });
  const [scheduleData, setScheduleData] = useState<
    Map<string, CinemaScheduleHeader>
  >(new Map());
  const [hasScheduleLoad, setHasScheduleLoad] = useState(false);
  const [selectedCinema, setSelectedCinema] = useState("");
  const { showSnackBar } = useContext(SnackBarContext);
  //bagian tanggal
  const tanggalAwal = dayjs("2025-05-16");
  const [tanggalPilihan, setTanggalPilihan] = useState<Dayjs>(tanggalAwal);
  const handleGantiTanggal = (tangalBaru: Dayjs) => {
    // console.log("ganti tanggal");
    setTanggalPilihan(tangalBaru);
    // console.log(tanggalPilihan.format("YYYY-MM-DD"));
  };
  //
  useEffect(() => {
    const loadData = async () => {
      const hasModalFetched = await fetchModalMovies(
        modalData,
        setModalData,
        setModalMovies
      );
      const hasCinemaSCheduleFetch = await fetchCinemaScheduleData(
        setScheduleData,
        tanggalPilihan.format("YYYY-MM-DD")
      );
      await wait();
      if (hasModalFetched && hasCinemaSCheduleFetch) {
        setHasScheduleLoad(true);
      } else {
        showSnackBar("Data Cinema Schedule gagal di muat", "error");
      }
    };
    loadData();
    // console.log("terjadi load data");
  }, []);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    } else {
      setHasScheduleLoad(false);
      // console.log("terjadi perubahan tanggal");
      const loadData = async () => {
        const hasCinemaSCheduleFetch = await fetchCinemaScheduleData(
          setScheduleData,
          tanggalPilihan.format("YYYY-MM-DD")
        );
        await wait();
        if (hasCinemaSCheduleFetch) {
          setHasScheduleLoad(true);
        }
      };
      loadData();
    }
  }, [tanggalPilihan]);

  return (
    <>
      <Container maxWidth="xl" sx={{ flexGrow: 1, height: "auto" }}>
        <PilihanTanggal
          tanggalAwal={tanggalAwal}
          handleChangeDate={handleGantiTanggal}
          tanggalPilihan={tanggalPilihan}
        />
        <FormModalCreate
          open={modalData.open}
          handleClose={handleModalClose}
          handleOpen={handleModalOpen}
          movieData={modalMovies}
          movieDataHasLoad={modalData.movieDataHasLoad}
          cinemaId={selectedCinema}
          setScheduleData={setScheduleData}
          tglPilihan={tanggalPilihan}
        />
        <FormModalUpdate
          open={modalUpdateData.open}
          handleClose={handleModalUpdateClose}
          handleOpen={handleModalUpdateOpen}
          setScheduleData={setScheduleData}
          movieProp={selectedUpdateMovie}
          movieData={modalMovies}
        />
        <Box sx={{ my: "20px" }}></Box>
        {hasScheduleLoad ? (
          <ScheduleContent
            scheduleData={scheduleData!}
            handleModalOpen={handleModalOpen}
            setSelectedCinema={setSelectedCinema}
            handleOpenModalUpdate={handleModalUpdateOpen}
            setSelectedUpdateMovie={handleSelectUpdateMovies}
          />
        ) : (
          <MovieScheduleSkeleton jumlah={3} />
        )}
      </Container>
    </>
  );
}

export default MovieScheduleView;

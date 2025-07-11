import { Grid, Skeleton, Stack } from "@mui/material";

function MovieScheduleSkeleton({ jumlah }: { jumlah: number }) {
  return (
    <>
      {Array.from({ length: jumlah }, () => (
        <>
          <HeaderSectionSkeleton />
          <Grid
            container
            rowSpacing={5}
            columnSpacing={1.5}
            marginBottom="30px"
            paddingY="8px"
          >
            <Grid size={{ xs: 12, sm: 12, md: 5, lg: 4, xl: 3 }}>
              <Skeleton variant="rounded" height={182} />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 5, lg: 4, xl: 3 }}>
              <Skeleton variant="rounded" height={182} />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 5, lg: 4, xl: 3 }}>
              <Skeleton variant="rounded" height={182} />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 5, lg: 4, xl: 3 }}>
              <Skeleton variant="rounded" height={182} />
            </Grid>
          </Grid>
        </>
      ))}
    </>
  );
}

function HeaderSectionSkeleton() {
  return (
    <Stack direction="row" alignItems="center" spacing={1.5}>
      <Skeleton variant="rounded" height={45} width={250} />
      <Skeleton variant="circular" height={45} width={45} />
    </Stack>
  );
}

// function ContentPlaceholder({
//   modalOpen,
//   handleModalClose,
//   handleModalOpen,
//   movieData,
//   movieDataHasLoad,
// }: //   scheduleData,
// {
//   movieData: MovieObject[];
//   modalOpen: boolean;
//   movieDataHasLoad: boolean;
//   handleModalOpen: () => void;
//   handleModalClose: () => void;
//   //   scheduleData: Map<string, CinemaScheduleHeader>;
// }) {
//   return (
//     <>
//       <HeaderSection
//         judul="Cinema 1"
//         modalProp={{
//           open: modalOpen,
//           handleClose: handleModalClose,
//           handleOpen: handleModalOpen,
//           movieData: movieData,
//           movieDataHasLoad: movieDataHasLoad,
//         }}
//       />
//       <Grid
//         container
//         rowSpacing={5}
//         columnSpacing={1.5}
//         marginBottom="30px"
//         paddingX="10px"
//       >
//         <MovieScheduleGridItem
//           judul="Bocchi The Rock the Movie : Re Re Bring it Again"
//           awalTayang="17.00"
//           akhirTayang="19.30"
//           harga="Rp 35.000"
//           onClick={() => {}}
//           imgSrc=""
//         />
//       </Grid>

//       <HeaderSection
//         judul="Cinema 2"
//         modalProp={{
//           open: modalOpen,
//           handleClose: handleModalClose,
//           handleOpen: handleModalOpen,
//           movieData: movieData,
//           movieDataHasLoad: movieDataHasLoad,
//         }}
//       />
//       <TidakAdaJadwal namaCinema="Cinema 2" />
//     </>
//   );
// }

export { MovieScheduleSkeleton };

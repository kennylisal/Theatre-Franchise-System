import { program } from "commander";
import { insertMovie } from "../router/movies/query.js";
import knexDB from "../config/knex_db.js";
import { tesLogAdmin } from "../logger/index.js";
import {
  hashPassword,
  matchCryptedPassword,
} from "../router/auth/password_config.js";
program
  .version("1.0.0")
  .description("Ini CLI awal lmao")
  .action(() => {
    console.log("Halo Penguna");
  });

program.command("fungsi").action(() => {
  console.log("fungsi berhasil lmao");
});

program.command("insert_movie").action(async () => {
  const tes = await knexDB.transaction(async (trx) => {
    const idMovie = await insertMovie(
      "GadFather",
      true,
      "https://gambar",
      169,
      undefined,
      undefined,
      trx
    );
    await tesLogAdmin("lisal_admin", "INSERT", `${idMovie}`, trx);
  });
});

program.command("tes_password").action(async () => {
  // const hasil = await hashPassword("password");
  // console.log(hasil);
  try {
    const res = await matchCryptedPassword(
      "password",
      "$2b$10$RcTimPk84X6m4AJ99uqY2e.Valc8.c7s6Cl1vSTEQ4NWL7D/3.PTe"
    );
  } catch (error) {
    console.log(error);
  }
});

program.parse(process.argv);
// program
// .command("Daftar_Kami")
// .option("--username <user>", "Masukkan user admin")
// .option("--password <password>", "Masukkan pass admin")
// .description("Cari skema keluarga berdasaran nomor KK")
// .action(async (options: { username: string; password: string }) => {
//   console.log("halo dafatar kmai");
//   await withSpinner(
//     "Mencoban dafat akun admin",
//     "Pendaftaran selesai",
//     async () => {
//       await daftarkanAdmin(options.username, options.password, "GOD_ADMIN");
//     }
//   );
// });

// //

// program.command("update_function").action(async () => {
// const result = await withSpinner("memulai update", "selesai update", () =>
//   dokuemntasiFunctionCLI()
// );
// // logSuccess(result);
// });

// program
//   .command("cari-KK <NIK>")
//   .alias("ckk")
//   .description("cari KK dari NIK")
//   .action(async (NIK: string) => {
//     tampilkanKKdariNIK(NIK);
//   });

// program
//   .command("keluarga <KK>")
//   .description("Cari skema keluarga berdasaran nomor KK")
//   .action(async (KK: string) => {
//     tampilkanKeluarga(KK);
//   });

// program
//   .command("ktp_lokasi")
//   .option("--provinsi <prov>", "Masukkan provinsi target")
//   .option("--kota <city>", "Masukkan kota target")
//   .option("--limit <lim>", "Masukkan kota target")
//   .description("Cari KTP berdasarkan provinsi dan kota tempat tinggal")
//   .action((options: { provinsi?: string; kota?: string; limit?: number }) => {
//     const provinsi = options.provinsi || null;
//     const kota = options.kota || null;
//     const limit = options.limit || null;
//     cariKTPLokasiQuery(provinsi, kota, limit);
//   });

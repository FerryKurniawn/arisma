import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Rekapsuratmasukadmin from "./components/admin-tu/surat-masuk/Rekap-surat-masuk";
import Tambahsuratmasukadmin from "./components/admin-tu/surat-masuk/Tambah-surat-masuk";
import Editsuratmasukadmin from "./components/admin-tu/surat-masuk/Edit-surat-masuk";
import Detailsuratmasukadmin from "./components/admin-tu/surat-masuk/Detail-surat-masuk";
// surat keluar admin tu
import Rekapsuratkeluaradmin from "./components/admin-tu/surat-keluar/Rekap-surat-keluar";
import Editsuratkeluaradmin from "./components/admin-tu/surat-keluar/Edit-surat-keluar";
import Detailsuratkeluaradmin from "./components/admin-tu/surat-keluar/Detail-surat-keluar";
import Tambahsuratkeluaradmin from "./components/admin-tu/surat-keluar/Tambah-surat-keluar";
//kepsek
import Suratmasukkepsek from "./components/kepsek/Surat-masuk";
import Detailsuratmasukkepsek from "./components/kepsek/Detail-surat-masuk";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* Admin TU */}
          {/* Surat Masuk*/}
          <Route
            path="/admin/rekap-surat-masuk"
            element={<Rekapsuratmasukadmin />}
          />
          <Route
            path="/admin/tambah-surat-masuk"
            element={<Tambahsuratmasukadmin />}
          />
          <Route
            path="/admin/edit-surat-masuk/:id"
            element={<Editsuratmasukadmin />}
          />
          <Route
            path="/admin/detail-surat-masuk/:id"
            element={<Detailsuratmasukadmin />}
          />
          {/* Admin TU Surat Keluar */}
          <Route
            path="/admin/rekap-surat-keluar"
            element={<Rekapsuratkeluaradmin />}
          />
          <Route
            path="/admin/edit-surat-keluar/:id"
            element={<Editsuratkeluaradmin />}
          />
          <Route
            path="/admin/detail-surat-keluar/:id"
            element={<Detailsuratkeluaradmin />}
          />
          <Route
            path="/admin/tambah-surat-keluar"
            element={<Tambahsuratkeluaradmin />}
          />
          {/* Kepsek */}
          <Route
            path="/kepsek/rekap-surat-masuk"
            element={<Suratmasukkepsek />}
          />
          <Route
            path="/kepsek/detail-surat-masuk/:id"
            element={<Detailsuratmasukkepsek />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

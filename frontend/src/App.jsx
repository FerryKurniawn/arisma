import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
// surat masuk admin tu
import Rekapsuratmasukadmin from "./components/admin-tu/surat-masuk/Rekap-surat-masuk";
import Tambahsuratmasukadmin from "./components/admin-tu/surat-masuk/Tambah-surat-masuk";
import Editsuratmasukadmin from "./components/admin-tu/surat-masuk/Edit-surat-masuk";
import Detailsuratmasukadmin from "./components/admin-tu/surat-masuk/Detail-surat-masuk";
import BerandaAdmin from "./components/admin-tu/BerandaAdmin";
// surat keluar admin tu
import Rekapsuratkeluaradmin from "./components/admin-tu/surat-keluar/Rekap-surat-keluar";
import Editsuratkeluaradmin from "./components/admin-tu/surat-keluar/Edit-surat-keluar";
import Detailsuratkeluaradmin from "./components/admin-tu/surat-keluar/Detail-surat-keluar";
import Tambahsuratkeluaradmin from "./components/admin-tu/surat-keluar/Tambah-surat-keluar";
//kepsek
import Suratmasukkepsek from "./components/kepsek/Surat-masuk";
import Detailsuratmasukkepsek from "./components/kepsek/Detail-surat-masuk";
import BerandaKepsek from "./components/kepsek/BerandaKepsek";

import Success from "./components/admin-tu/SuccessAlert";
import ProtectedRoute from "./components/ProtectedRoute";
import DaftarDisposisi from "./components/kepsek/Disposisi/Daftar-Disposisi";
import DetailDisposisi from "./components/kepsek/Disposisi/Detail-Disposisi";
import EditDisposisi from "./components/kepsek/Disposisi/Edit-disposisi";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* Admin TU */}
          {/* Surat Masuk*/}
          <Route
            path="/admin/rekap-surat-masuk"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <Rekapsuratmasukadmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/tambah-surat-masuk"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <Tambahsuratmasukadmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/edit-surat-masuk/:id"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <Editsuratmasukadmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/detail-surat-masuk/:id"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <Detailsuratmasukadmin />
              </ProtectedRoute>
            }
          />
          {/* Admin TU Surat Keluar */}
          <Route
            path="/admin/rekap-surat-keluar"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <Rekapsuratkeluaradmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/edit-surat-keluar/:id"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <Editsuratkeluaradmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/detail-surat-keluar/:id"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <Detailsuratkeluaradmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/tambah-surat-keluar"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <Tambahsuratkeluaradmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/beranda-admin"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <BerandaAdmin />
              </ProtectedRoute>
            }
          />
          {/* Kepsek */}
          <Route
            path="/kepsek/beranda-kepsek"
            element={
              <ProtectedRoute allowedRoles={["KEPSEK"]}>
                <BerandaKepsek />
              </ProtectedRoute>
            }
          />
          <Route
            path="/kepsek/surat-masuk"
            element={
              <ProtectedRoute allowedRoles={["KEPSEK"]}>
                <Suratmasukkepsek />
              </ProtectedRoute>
            }
          />
          <Route
            path="/kepsek/detail-surat-masuk/:id"
            element={
              <ProtectedRoute allowedRoles={["KEPSEK"]}>
                <Detailsuratmasukkepsek />
              </ProtectedRoute>
            }
          />
          <Route
            path="/kepsek/Daftar-Disposisi"
            element={
              <ProtectedRoute allowedRoles={["KEPSEK"]}>
                <DaftarDisposisi />
              </ProtectedRoute>
            }
          />
          <Route
            path="/kepsek/Disposisi/Detail-Disposisi/:id"
            element={
              <ProtectedRoute allowedRoles={["KEPSEK"]}>
                <DetailDisposisi />
              </ProtectedRoute>
            }
          />
          <Route
            path="/kepsek/Disposisi/Edit-Disposisi/:id"
            element={
              <ProtectedRoute allowedRoles={["KEPSEK"]}>
                <EditDisposisi />
              </ProtectedRoute>
            }
          />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

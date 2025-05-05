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

import Success from "./components/admin-tu/SuccessAlert";
import ProtectedRoute from "./components/ProtectedRoute";

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
          {/* Kepsek */}
          <Route
            path="/kepsek/rekap-surat-masuk"
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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";

import BerandaAdmin from "./components/admin-tu/BerandaAdmin";
import Rekapsuratmasukadmin from "./components/admin-tu/surat-masuk/Rekap-surat-masuk";
import Tambahsuratmasukadmin from "./components/admin-tu/surat-masuk/Tambah-surat-masuk";
import Editsuratmasukadmin from "./components/admin-tu/surat-masuk/Edit-surat-masuk";
import Detailsuratmasukadmin from "./components/admin-tu/surat-masuk/Detail-surat-masuk";
import Rekapsuratkeluaradmin from "./components/admin-tu/surat-keluar/Rekap-surat-keluar";
import Editsuratkeluaradmin from "./components/admin-tu/surat-keluar/Edit-surat-keluar";
import Detailsuratkeluaradmin from "./components/admin-tu/surat-keluar/Detail-surat-keluar";
import Tambahsuratkeluaradmin from "./components/admin-tu/surat-keluar/Tambah-surat-keluar";

import BerandaKepsek from "./components/kepsek/BerandaKepsek";
import Suratmasukkepsek from "./components/kepsek/surat-masuk/Rekap-surat-masuk";
import Detailsuratmasukkepsek from "./components/kepsek/surat-masuk/Detail-surat-masuk";
import DaftarDisposisi from "./components/kepsek/disposisi/Daftar-Disposisi";
import DetailDisposisi from "./components/kepsek/disposisi/Detail-Disposisi";
import EditDisposisi from "./components/kepsek/disposisi/Edit-Disposisi";

const adminRoutes = [
  { path: "/admin/rekap-surat-masuk", component: Rekapsuratmasukadmin },
  { path: "/admin/tambah-surat-masuk", component: Tambahsuratmasukadmin },
  { path: "/admin/edit-surat-masuk/:id", component: Editsuratmasukadmin },
  { path: "/admin/detail-surat-masuk/:id", component: Detailsuratmasukadmin },
  { path: "/admin/rekap-surat-keluar", component: Rekapsuratkeluaradmin },
  { path: "/admin/edit-surat-keluar/:id", component: Editsuratkeluaradmin },
  { path: "/admin/detail-surat-keluar/:id", component: Detailsuratkeluaradmin },
  { path: "/admin/tambah-surat-keluar", component: Tambahsuratkeluaradmin },
  { path: "/admin/beranda-admin", component: BerandaAdmin },
];

const kepsekRoutes = [
  { path: "/kepsek/beranda-kepsek", component: BerandaKepsek },
  { path: "/kepsek/surat-masuk", component: Suratmasukkepsek },
  { path: "/kepsek/detail-surat-masuk/:id", component: Detailsuratmasukkepsek },
  { path: "/kepsek/daftar-disposisi", component: DaftarDisposisi },
  { path: "/kepsek/detail-disposisi/:id", component: DetailDisposisi },
  { path: "/kepsek/edit-disposisi/:id", component: EditDisposisi },
];

const renderProtectedRoutes = (role, routes) => {
  return routes.map(({ path, component }) => (
    <Route
      key={path}
      path={path}
      element={
        <ProtectedRoute allowedRoles={[role]}>
          {React.createElement(component)}
        </ProtectedRoute>
      }
    />
  ));
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        {renderProtectedRoutes("ADMIN", adminRoutes)}
        {renderProtectedRoutes("KEPSEK", kepsekRoutes)}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

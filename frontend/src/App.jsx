import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Rekapsuratmasukadmin from "./components/admin-tu/Rekap-surat-masuk";
import Tambahsuratmasukadmin from "./components/admin-tu/Tambah-surat-masuk";
import Editsuratmasukadmin from "./components/admin-tu/Edit-surat-masuk";

import Suratmasukkepsek from "./components/kepsek/Surat-masuk";
import Detailsuratmasukkepsek from "./components/kepsek/Detail-surat-masuk";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* Admin TU */}
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

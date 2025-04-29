import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Rekapsuratmasuk from "./components/admin-tu/Rekap-surat-masuk";
import Tambahsuratmasuk from "./components/admin-tu/Tambah-surat-masuk";
import Editsuratmasuk from "./components/admin-tu/Edit-surat-masuk";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin/rekap-surat-masuk"
            element={<Rekapsuratmasuk />}
          />
          <Route
            path="/admin/tambah-surat-masuk"
            element={<Tambahsuratmasuk />}
          />
          <Route
            path="/admin/edit-surat-masuk/:id"
            element={<Editsuratmasuk />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

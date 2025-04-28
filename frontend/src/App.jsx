import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Rekapsuratmasuk from "./components/Rekap-surat-masuk";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/rekap-surat-masuk" element={<Rekapsuratmasuk />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

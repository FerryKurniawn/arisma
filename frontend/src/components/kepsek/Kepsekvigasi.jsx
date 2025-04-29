import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Navigasi() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleButtonClick = (buttonPath) => {
    navigate(buttonPath);
  };

  return (
    <div className="w-[400px] ml-5 flex flex-col items-center mt-[40px] shadow-md h-screen">
      <img src="/man1.png" alt="Logo" width="225" className="mt-5" />

      <div className="flex flex-col items-center mt-[40px] text-xl font-semibold">
        <h1>ARISMA</h1>
        <h2>ARSIP DIGITAL</h2>
        <h2>MADRASAH ALIYAH NEGERI 1 SINTANG</h2>
      </div>

      <div className="p-10 rounded-lg shadow-lg mt-[10px]">
        <div
          onClick={() => handleButtonClick("/kepsek/rekap-surat-masuk")}
          className={`flex items-center gap-4 p-2 mb-[20px] w-[300px] rounded-lg cursor-pointer ${
            location.pathname === "/kepsek/rekap-surat-masuk" ||
            "/kepsek/tambah-surat-masuk"
              ? "bg-[#34542C50]"
              : ""
          }`}
        >
          <img
            src="/surat_masuk.png"
            alt="Surat Masuk"
            className="w-[23px] h-[23px]"
          />
          <span
            className={`text-2xl font-semibold${
              location.pathname === "/kepsek/rekap-surat-masuk" ||
              "/kepsek/tambah-surat-masuk"
                ? "text-black font-bold"
                : "text-gray-600"
            }`}
          >
            Surat Masuk
          </span>
        </div>

        <div
          onClick={() => handleButtonClick("/kepsek/rekap-surat-keluar")}
          className={`flex items-center gap-4 mb-[20px] w-[300px] p-2 rounded-lg cursor-pointer ${
            location.pathname === "/kepsek/rekap-surat-keluar"
              ? "bg-[#34542C50]"
              : ""
          }`}
        >
          <img
            src="/google-docs.png"
            alt="Surat Keluar"
            className="w-[23px] h-[23px]"
          />
          <span
            className={`text-2xl font-semibold ${
              location.pathname === "/kepsek/rekap-surat-keluar"
                ? "text-black"
                : "text-gray-600"
            }`}
          >
            Surat Keluar
          </span>
        </div>
      </div>
    </div>
  );
}

export default Navigasi;

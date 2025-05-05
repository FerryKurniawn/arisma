import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Navigasi() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleButtonClick = (buttonPath) => {
    navigate(buttonPath);
  };

  return (
    <div className="w-[250px] sticky top-0 left-0 h-screen bg-white shadow-lg z-10 overflow-y-auto">
      <div className="flex flex-col items-center p-4">
        <img src="/man1.png" alt="Logo" width="150" className="mt-5 mb-3" />
        <div className="text-center text-base font-semibold leading-tight mb-4">
          <h1 className="text-lg">ARISMA</h1>
          <h2 className="text-sm">ARSIP DIGITAL</h2>
          <h2 className="text-sm">MAN 1 SINTANG</h2>
        </div>

        <div className="w-full px-3">
          {/* Surat Masuk */}
          <div
            onClick={() => handleButtonClick("/admin/rekap-surat-masuk")}
            className={`flex items-center gap-3 p-2 mb-3 rounded-lg cursor-pointer transition-colors ${
              location.pathname === "/admin/rekap-surat-masuk" ||
              location.pathname === "/admin/tambah-surat-masuk" ||
              location.pathname.startsWith("/admin/edit-surat-masuk") ||
              location.pathname.startsWith("/admin/detail-surat-masuk")
                ? "bg-[#34542C50] font-bold text-black"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <img src="/surat_masuk.png" alt="Surat Masuk" className="w-5 h-5" />
            <span className="text-sm">Surat Masuk</span>
          </div>

          {/* Surat Keluar */}
          <div
            onClick={() => handleButtonClick("/admin/rekap-surat-keluar")}
            className={`flex items-center gap-3 p-2 mb-3 rounded-lg cursor-pointer transition-colors ${
              location.pathname === "/admin/rekap-surat-keluar" ||
              location.pathname === "/admin/tambah-surat-keluar" ||
              location.pathname.startsWith("/admin/edit-surat-keluar/") ||
              location.pathname.startsWith("/admin/detail-surat-keluar/")
                ? "bg-[#34542C50] font-bold text-black"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <img
              src="/google-docs.png"
              alt="Surat Keluar"
              className="w-5 h-5"
            />
            <span className="text-sm">Surat Keluar</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navigasi;

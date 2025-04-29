import React from "react";

const Sidebar = () => {
  const currentPath = window.location.pathname;

  return (
    <aside className="w-[250px] bg-white text-black h-screen fixed left-0 top-0 z-20 p-6 shadow-md">
      {/* Logo */}
      <div className="flex justify-center mb-4">
        <img src="logo.png" alt="Logo" className="w-32" />
      </div>

      {/* Judul */}
      <div className="text-center text-sm mb-8">
        <h1 className="font-bold text-lg">ARISMA</h1>
        <h2>SISTEM INFORMASI</h2>
        <h2>MADRASAH ALIYAH NEGERI 1 SINTANG</h2>
      </div>

      {/* Menu */}
      <ul className="space-y-4 text-black">
        <li
          className={`flex items-center gap-3 cursor-pointer p-2 rounded hover:bg-gray-100 ${
            currentPath === "/surat-masuk" ? "font-bold bg-gray-200" : ""
          }`}
          onClick={() => (window.location.href = "/surat-masuk")}
        >
          <img src="surat_masuk.png" alt="Surat Masuk" className="w-6 h-6" />
          <span>Surat Masuk</span>
        </li>
        <li
          className={`flex items-center gap-3 cursor-pointer p-2 rounded hover:bg-gray-100 ${
            currentPath === "/surat-keluar" ? "font-bold bg-gray-200" : ""
          }`}
          onClick={() => (window.location.href = "/surat-keluar")}
        >
          <img src="surat_keluar.png" alt="Surat Keluar" className="w-6 h-6" />
          <span>Surat Keluar</span>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;

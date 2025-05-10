import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Navigasi() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      label: "Beranda",
      path: "/kepsek/beranda-kepsek",
      icon: "/beranda.png",
    },
    {
      label: "Surat Masuk",
      path: "/kepsek/surat-masuk",
      additionalPaths: ["/kepsek/detail-surat-masuk"],
      icon: "/surat_masuk.png",
    },
    {
      label: "Disposisi",
      path: "/kepsek/daftar-disposisi",
      additionalPaths: [
        "/kepsek/detail-disposisi",
        "/kepsek/edit-disposisi",
        // Menambahkan path untuk admin dengan id dinamis
        "/kepsek/detail-disposisi/", // path dinamis
        "/kepsek/edit-disposisi/", // path dinamis
      ],
      icon: "/google-docs.png",
    },
  ];

  // Fungsi untuk memeriksa apakah lokasi saat ini cocok dengan path atau path dinamis
  const isActive = (path, additionalPaths = []) => {
    // Periksa path utama
    if (location.pathname === path) return true;

    // Periksa path dinamis menggunakan regex
    return additionalPaths.some((p) => {
      const regex = new RegExp(`^${p}([/].*)?$`); // Mengizinkan parameter setelah '/'
      return regex.test(location.pathname);
    });
  };

  return (
    <div className="w-[320px] h-screen fixed top-0 left-0 bg-white shadow-md flex flex-col items-center py-6 z-50">
      <img src="/man1.png" alt="Logo" width="170" className="mt-2" />

      <div className="flex flex-col items-center mt-4 text-lg font-semibold text-center px-4">
        <h1>ARISMA</h1>
        <h2>ARSIP DIGITAL</h2>
        <h2>MADRASAH ALIYAH NEGERI 1 SINTANG</h2>
      </div>

      <div className="mt-8 w-full flex flex-col items-center">
        {menuItems.map((item, idx) => {
          const active = isActive(item.path, item.additionalPaths);
          return (
            <div
              key={idx}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-4 p-3 mb-4 w-[230px] rounded-lg cursor-pointer transition-all duration-200 ${
                active ? "bg-[#34542C50]" : "hover:bg-gray-100"
              }`}
            >
              <img
                src={item.icon}
                alt={item.label}
                className="w-[24px] h-[24px]"
              />
              <span
                className={`text-lg ${
                  active ? "text-black font-semibold" : "text-gray-600"
                }`}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Navigasi;

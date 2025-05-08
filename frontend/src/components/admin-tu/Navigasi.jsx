import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function NavigasiAdmin() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      label: "Beranda",
      path: "/admin/beranda-admin",
      icon: "/beranda.png"
    },
    {
      label: "Surat Masuk",
      path: "/admin/rekap-surat-masuk",
      additionalPaths: [
        "/admin/tambah-surat-masuk",
        "/admin/edit-surat-masuk",
        "/admin/detail-surat-masuk"
      ],
      icon: "/surat_masuk.png"
    },
    {
      label: "Surat Keluar",
      path: "/admin/rekap-surat-keluar",
      additionalPaths: [
        "/admin/tambah-surat-keluar",
        "/admin/edit-surat-keluar/",
        "/admin/detail-surat-keluar/"
      ],
      icon: "/google-docs.png"
    }
  ];

  const isActive = (path, additionalPaths = []) =>
    location.pathname === path ||
    additionalPaths.some((p) => location.pathname.startsWith(p));

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
              <img src={item.icon} alt={item.label} className="w-[24px] h-[24px]" />
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

export default NavigasiAdmin;

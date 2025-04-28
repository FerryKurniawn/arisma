import React from "react";
import Navigasi from "./Navigasi";

const RekapSuratMasuk = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Navigasi />

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-start">
          <h1 className="text-2xl font-bold">Rekap Surat Masuk</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Admin TU 1</span>
            <button className="border px-3 py-1 rounded text-sm hover:bg-gray-200 transition">
              Logout
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 mt-6 mb-6">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Cari"
              className="w-full border rounded-md py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
            <div className="absolute right-3 top-2.5 text-gray-400">🔍</div>
          </div>
          <button className="bg-gray-300 hover:bg-gray-400 px-6 py-2 text-sm rounded-md">
            Cari
          </button>
        </div>

        {/* Table */}
        <div className="bg-white shadow-md rounded-md overflow-x-auto">
          <table className="min-w-full text-sm table-fixed">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left font-semibold">No. Surat</th>
                <th className="p-3 text-left font-semibold">Perihal</th>
                <th className="p-3 text-left font-semibold">Alamat Pengirim</th>
                <th className="p-3 text-left font-semibold">Tanggal Terima</th>
                <th className="p-3 text-left font-semibold">Sifat Surat</th>
                <th className="p-3 text-left font-semibold">Disposisi</th>
                <th className="p-3 text-left font-semibold">Isi Disposisi</th>
                <th className="p-3 text-center font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="p-3">2/54/2025</td>
                <td className="p-3">Undangan Komp</td>
                <td className="p-3">Universitas Tanjungpura</td>
                <td className="p-3">07/09/2024</td>
                <td className="p-3">Biasa</td>
                <td className="p-3">Kepala Sekolah</td>
                <td className="p-3"></td>
                <td className="p-3 flex justify-center items-center gap-3">
                  <button className="text-yellow-500 hover:text-yellow-600 text-lg">
                    ✏️
                  </button>
                  <button className="text-red-500 hover:text-red-600 text-lg">
                    🗑️
                  </button>
                </td>
              </tr>

              {/* Kosong untuk baris tambahan */}
              <tr className="h-12 bg-gray-50"></tr>
              <tr className="h-12"></tr>
              <tr className="h-12 bg-gray-50"></tr>
              <tr className="h-12"></tr>
            </tbody>
          </table>
        </div>

        {/* Tombol Tambah */}
        <div className="flex justify-end mt-6">
          <button className="bg-gray-300 hover:bg-gray-400 px-8 py-2 rounded-md text-sm">
            Tambah
          </button>
        </div>
      </main>
    </div>
  );
};

export default RekapSuratMasuk;

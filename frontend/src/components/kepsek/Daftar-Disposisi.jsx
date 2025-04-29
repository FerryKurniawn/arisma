import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navigasi from "./Kepsekvigasi";

const DaftarDisposisi = () => {
  const navigate = useNavigate();
  const { id } = useParams(); 



}

return (
    <div className="flex min-h-screen bg-gray-100">
      <Navigasi />

      <main className="flex-1 p-8">
        <div className="flex flex-col items-start justify-between mb-6">
          <div className="flex items-center gap-4 ml-auto">
            <span className="text-sm font-medium">Kepala Sekolah</span>
            <button
              className="border px-3 py-1 rounded text-sm hover:bg-gray-200 transition"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Daftar Disposisi</h2>
            <div className="flex items-center gap-2">
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Cari"
                  className="w-full border rounded-md py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
                <div className="absolute right-3 top-2.5 text-gray-400">
                  <img src="/search.png" width="15px" />
                </div>
              </div>
              <button className="bg-gray-300 hover:bg-gray-400 px-6 py-2 text-sm rounded-md">
                Cari
              </button>
            </div>
          </div>
        </div>

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
                <th className="p-3 text-left font-semibold">Tenggat Waktu</th>
                <th className="p-3 text-center font-semibold">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {suratMasuk.map((surat, index) => (
                <tr key={index} className="border-t">
                  <td className="p-3">{surat.noSurat}</td>
                  <td className="p-3">{surat.perihal}</td>
                  <td className="p-3">{surat.alamatPengirim}</td>
                  <td className="p-3">{formatTanggal(surat.tanggalTerima)}</td>
                  <td className="p-3">{surat.sifatSurat}</td>
                  <td className="p-3">{surat.disposisi}</td>
                  <td className="p-3">{surat.tenggatwaktu}</td>
                  <td className="p-3 flex justify-center items-center gap-3 mt-3">
                    <button
                      onClick={() => handleView(surat.id)}
                      className="hover:cursor-pointer"
                    >
                      <img src="/eye.png" width="25px" alt="Edit" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );

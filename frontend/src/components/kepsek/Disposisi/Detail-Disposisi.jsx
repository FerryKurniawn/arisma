import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navigasi from "../Kepsekvigasi";

const DetailDisposisi = () => {
  const navigate = useNavigate();


  const handleLogout = (e) => {
    e.preventDefault();
    navigate("/login");
  };

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

          <h2 className="text-2xl font-bold mt-4">Detail Disposisi</h2>
        </div>

        <div className="flex flex-col gap-4 max-w-full bg-white p-6 rounded shadow">
          <div className="flex gap-4">
            <p className="font-semibold w-1/3">No. Surat:</p>
            <p className="w-2/3">{surat.noSurat}</p>
          </div>

          <div className="flex gap-4">
            <p className="font-semibold w-1/3">Perihal:</p>
            <p className="w-2/3">{surat.perihal}</p>
          </div>

          <div className="flex gap-4">
            <p className="font-semibold w-1/3">Alamat Pengirim:</p>
            <p className="w-2/3">{surat.alamatPengirim}</p>
          </div>

          <div className="flex gap-4">
            <p className="font-semibold w-1/3">Tanggal Terima:</p>
            <p className="w-2/3">{surat.tanggalTerima}</p>
          </div>

          <div className="flex gap-4">
            <p className="font-semibold w-1/3">Sifat Surat:</p>
            <p className="w-2/3">{surat.sifatSurat}</p>
          </div>

          <div className="flex gap-4">
            <p className="font-semibold w-1/3">Disposisikan ke:</p>
            <p className="w-2/3">{surat.disposisikanKe}</p>
          </div>

          <div className="flex gap-4">
            <p className="font-semibold w-1/3">Isi disposisi:</p>
            <p className="w-2/3">{surat.isiDisposisi}</p>
          </div>

          <div className="flex gap-4">
            <p className="font-semibold w-1/3">Tenggat Waktu:</p>
            <p className="w-2/3">{disposisi.tenggatWaktu}</p>
          </div>
        </div>
      ) : (
          <p>Loading...</p> // Show loading state while data is fetching
        )
      </main>
    </div>
  );
};

export default DetailDisposisi;

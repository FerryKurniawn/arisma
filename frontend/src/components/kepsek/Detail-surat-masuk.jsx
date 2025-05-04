import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navigasi from "./Kepsekvigasi";

const DetailSuratMasuk = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [surat, setSurat] = useState({
    noSurat: "",
    perihal: "",
    alamatPengirim: "",
    tanggalTerima: "",
    sifatSurat: "",
    disposisi: "",
    isiDisposisi: "",
    fileUrl: "",
    disposisikanKe: "",
  });

  useEffect(() => {
    const fetchSurat = async () => {
      try {
        const response = await fetch(
          `http://localhost:2000/api/surat-masuk/${id}`
        );
        if (!response.ok) throw new Error("Gagal mengambil data surat masuk");
        const data = await response.json();

        console.log("Fetched data:", data); // Log the raw data here

        setSurat({
          noSurat: data.noSurat,
          perihal: data.perihal,
          alamatPengirim: data.alamatPengirim,
          tanggalTerima: data.tanggalTerima.slice(0, 10),
          sifatSurat: data.sifatSurat,
          disposisi:
            !data.disposisi || data.disposisi === "null" ? "-" : data.disposisi, // Check for null, undefined, or "null"
          isiDisposisi:
            !data.isiDisposisi || data.isiDisposisi === "null"
              ? "-"
              : data.isiDisposisi,
          fileUrl: data.fileUrl,
        });
      } catch (error) {
        console.error("Error fetching surat masuk:", error);
      }
    };

    fetchSurat();
  }, [id]);

  const handleLogout = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  const handleDisposisikanChange = (e) => {
    setSurat({ ...surat, disposisikanKe: e.target.value });
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

          <h2 className="text-2xl font-bold mt-4">Detail Surat Masuk</h2>
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
            <p className="font-semibold w-1/3">File Lampiran:</p>
            {surat.fileUrl ? (
              <a
                href={`http://localhost:2000${surat.fileUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline w-2/3"
              >
                Lihat File
              </a>
            ) : (
              <p className="text-gray-500 italic w-2/3">
                Tidak ada file terlampir
              </p>
            )}
          </div>
        </div>

        <div>
          <div className="p-5">
            <h1 className="font-bold text-xl">Form Disposisi</h1>
          </div>
          <div className="flex flex-col gap-4 max-w-full bg-white p-6 rounded shadow">
            <div className="flex gap-4">
              <p className="font-semibold w-1/3">Disposisikan ke:</p>
              <select
                className="w-2/3 p-2 border rounded"
                value={surat.disposisikanKe}
                onChange={handleDisposisikanChange}
              >
                <option value="">Pilih</option> {/* Default "Pilih" option */}
                <option value="admin-tu-1">Admin TU 1</option>
                <option value="admin-tu-2">Admin TU 2</option>
              </select>
            </div>

            <div className="flex gap-4">
              <p className="font-semibold w-1/3">Disposisi:</p>
              <p className="w-2/3">{surat.disposisi}</p>
            </div>

            <div className="flex gap-4">
              <p className="font-semibold w-1/3">Isi Disposisi:</p>
              <p className="w-2/3">{surat.isiDisposisi}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DetailSuratMasuk;

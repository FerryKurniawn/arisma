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
  });

  useEffect(() => {
    const fetchSurat = async () => {
      try {
        const response = await fetch(
          `http://localhost:2000/api/surat-masuk/${id}`
        );
        if (!response.ok) throw new Error("Gagal mengambil data surat masuk");
        const data = await response.json();

        setSurat({
          noSurat: data.noSurat,
          perihal: data.perihal,
          alamatPengirim: data.alamatPengirim,
          tanggalTerima: data.tanggalTerima.slice(0, 10),
          sifatSurat: data.sifatSurat,
          disposisi: data.disposisi,
          isiDisposisi: data.isiDisposisi,
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
          <div>
            <p className="font-semibold">No. Surat:</p>
            <p>{surat.noSurat}</p>
          </div>

          <div>
            <p className="font-semibold">Perihal:</p>
            <p>{surat.perihal}</p>
          </div>

          <div>
            <p className="font-semibold">Alamat Pengirim:</p>
            <p>{surat.alamatPengirim}</p>
          </div>

          <div>
            <p className="font-semibold">Tanggal Terima:</p>
            <p>{surat.tanggalTerima}</p>
          </div>

          <div>
            <p className="font-semibold">Sifat Surat:</p>
            <p>{surat.sifatSurat}</p>
          </div>

          <div>
            <p className="font-semibold">Disposisi:</p>
            <p>{surat.disposisi}</p>
          </div>

          <div>
            <p className="font-semibold">Isi Disposisi:</p>
            <p>{surat.isiDisposisi}</p>
          </div>

          <div>
            <p className="font-semibold">File Lampiran:</p>
            {surat.fileUrl ? (
              <a
                href={`http://localhost:2000${surat.fileUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                Lihat File
              </a>
            ) : (
              <p className="text-gray-500 italic">Tidak ada file terlampir</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DetailSuratMasuk;

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navigasi from "../Navigasi";

const DetailSuratKeluar = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [surat, setSurat] = useState(null);

  useEffect(() => {
    const fetchSurat = async () => {
      try {
        const response = await fetch(
          `http://localhost:2000/api/surat-keluar/${id}`
        );
        if (!response.ok) {
          throw new Error("Gagal mengambil data surat keluar");
        }
        const data = await response.json();
        setSurat(data);
      } catch (error) {
        console.error("Error fetching surat keluar:", error);
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
            <span className="text-sm font-medium">Admin TU</span>
            <button
              className="border px-3 py-1 rounded text-sm hover:bg-gray-200 transition"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>

          <h2 className="text-2xl font-bold mt-4">Detail Surat Keluar</h2>
        </div>

        {surat ? (
          <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-3xl">
            <div className="mb-4">
              <h3 className="font-semibold">No. Surat</h3>
              <p>{surat.noSurat}</p>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold">No. Berkas</h3>
              <p>{surat.noBerkas}</p>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold">Alamat Penerima</h3>
              <p>{surat.alamatPenerima}</p>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold">Tanggal Keluar</h3>
              <p>{surat.tanggalKeluar?.slice(0, 10)}</p>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold">Perihal</h3>
              <p>{surat.perihal}</p>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold">No. Petunjuk</h3>
              <p>{surat.noPetunjuk}</p>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold">No. Paket</h3>
              <p>{surat.noPaket}</p>
            </div>
            <div className="mt-6">
              <button
                onClick={() => navigate("/admin/rekap-surat-keluar")}
                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-md text-sm"
              >
                Kembali ke Rekap
              </button>
            </div>
          </div>
        ) : (
          <p>Memuat data surat keluar...</p>
        )}
      </main>
    </div>
  );
};

export default DetailSuratKeluar;

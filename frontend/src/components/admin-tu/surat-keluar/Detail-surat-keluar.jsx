import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navigasi from "../Navigasi";
import Logout from "../../Logout";

const DetailSuratKeluar = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [surat, setSurat] = useState(null);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };

    fetchSurat();
  }, [id]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Navigasi />
      <main className="flex-1 p-8">
        <div className="flex flex-col items-start justify-between mb-6">
          <div className="flex items-center gap-4 ml-auto">
            <Logout />
          </div>

          <div className="flex flex-row justify-between items-center w-full">
            <h2 className="text-2xl font-bold mt-4">Surat Masuk</h2>
            <img
              src="/back.png"
              alt="back"
              width="20px"
              className="mt-5"
              onClick={() => {
                navigate("/admin/rekap-surat-masuk");
              }}
            />
          </div>
        </div>

        {loading ? (
          <p>Loading data surat keluar...</p>
        ) : surat ? (
          <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-3xl">
            <div className="mb-4">
              <h3 className="font-semibold">No. Surat</h3>
              <p>{surat.noSurat ?? "null"}</p>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold">No. Berkas</h3>
              <p>{surat.noBerkas ?? "null"}</p>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold">Alamat Penerima</h3>
              <p>{surat.alamatPenerima ?? "null"}</p>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold">Tanggal Keluar</h3>
              <p>{surat.tanggalKeluar?.slice(0, 10) ?? "null"}</p>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold">Perihal</h3>
              <p>{surat.perihal ?? "null"}</p>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold">No. Petunjuk</h3>
              <p>{surat.noPetunjuk ?? "null"}</p>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold">No. Paket</h3>
              <p>{surat.noPaket ?? "null"}</p>
            </div>
          </div>
        ) : (
          <p>Data surat keluar tidak ditemukan pada id {id}.</p>
        )}
      </main>
    </div>
  );
};

export default DetailSuratKeluar;

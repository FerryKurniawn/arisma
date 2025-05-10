import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navigasi from "../Kepsekvigasi";
import Logout from "../../Logout";

const formatTanggal = (tanggal) => {
  if (!tanggal) return "-";
  const date = new Date(tanggal);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const DetailDisposisi = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [surat, setSurat] = useState(null);

  useEffect(() => {
    const fetchSurat = async () => {
      try {
        const response = await fetch(
          `http://localhost:2000/api/surat-masuk/${id}`
        );
        if (!response.ok) throw new Error("Gagal mengambil data surat masuk");

        const data = await response.json();
        setSurat(data);
      } catch (error) {
        console.error("Error fetching surat masuk:", error);
      }
    };

    fetchSurat();
  }, [id]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="w-[320px] flex-shrink-0">
        <Navigasi />
      </div>

      <div className="flex-1 flex flex-col">
        <div className="w-full bg-white shadow-md p-4 flex justify-end sticky top-0 z-30">
          <Logout />
        </div>

        <main className="flex-1 p-8">
          <div className="flex justify-between items-center mt-6 mb-6">
            <h2 className="text-2xl font-bold">Detail Disposisi</h2>
            <img
              src="/back.png"
              alt="back"
              width="20px"
              className="cursor-pointer"
              onClick={() => navigate("/kepsek/Daftar-Disposisi")}
            />
          </div>

          {surat ? (
            <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-3xl">
              <div className="mb-4 grid grid-cols-3 gap-4">
                <h3 className="font-semibold">No. Surat</h3>
                <p className="col-span-2">{surat.noSurat}</p>
              </div>
              <div className="mb-4 grid grid-cols-3 gap-4">
                <h3 className="font-semibold">Perihal</h3>
                <p className="col-span-2">{surat.perihal}</p>
              </div>
              <div className="mb-4 grid grid-cols-3 gap-4">
                <h3 className="font-semibold">Alamat Pengirim</h3>
                <p className="col-span-2">{surat.alamatPengirim}</p>
              </div>
              <div className="mb-4 grid grid-cols-3 gap-4">
                <h3 className="font-semibold">Tanggal Terima</h3>
                <p className="col-span-2">
                  {formatTanggal(surat.tanggalTerima)}
                </p>
              </div>
              <div className="mb-4 grid grid-cols-3 gap-4">
                <h3 className="font-semibold">Sifat Surat</h3>
                <p className="col-span-2">{surat.sifatSurat}</p>
              </div>
              <div className="mb-4 grid grid-cols-3 gap-4">
                <h3 className="font-semibold">Disposisikan Ke</h3>
                <p className="col-span-2">
                  {surat.disposisi?.trim() ? surat.disposisi : "-"}
                </p>
              </div>
              <div className="mb-4 grid grid-cols-3 gap-4">
                <h3 className="font-semibold">Isi Disposisi</h3>
                <p className="col-span-2">
                  {surat.isiDisposisi?.trim() ? surat.isiDisposisi : "-"}
                </p>
              </div>
              <div className="mb-4 grid grid-cols-3 gap-4">
                <h3 className="font-semibold">Tenggat Waktu</h3>
                <p className="col-span-2">
                  {formatTanggal(surat.tenggatWaktu)}
                </p>
              </div>
              {surat.fileUrl && (
                <div className="mb-4 grid grid-cols-3 gap-4">
                  <h3 className="font-semibold">File Surat</h3>
                  <a
                    href={`http://localhost:2000${surat.fileUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline col-span-2"
                  >
                    Lihat File
                  </a>
                </div>
              )}
            </div>
          ) : (
            <p>Memuat data...</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default DetailDisposisi;

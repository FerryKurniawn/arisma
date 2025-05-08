import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navigasi from "./Kepsekvigasi";
import Logout from "../Logout";

const DetailSuratMasuk = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [surat, setSurat] = useState({
    noSurat: "",
    perihal: "",
    alamatPengirim: "",
    tanggalTerima: "",
    sifatSurat: "",
    isiDisposisi: "",
    fileUrl: "",
    disposisikanKe: "",
    tenggatWaktu: "",
  });

  useEffect(() => {
    const fetchSurat = async () => {
      try {
        const response = await fetch(`http://localhost:2000/api/surat-masuk/${id}`);
        if (!response.ok) throw new Error("Gagal mengambil data surat masuk");
        const data = await response.json();

        setSurat({
          noSurat: data.noSurat,
          perihal: data.perihal,
          alamatPengirim: data.alamatPengirim,
          tanggalTerima: data.tanggalTerima.slice(0, 10),
          sifatSurat: data.sifatSurat,
          isiDisposisi: data.isiDisposisi && data.isiDisposisi !== "null" ? data.isiDisposisi : "",
          fileUrl: data.fileUrl,
          disposisikanKe: "",
          tenggatWaktu: "",
        });
      } catch (error) {
        console.error("Error fetching surat masuk:", error);
      }
    };

    fetchSurat();
  }, [id]);

  const handleChange = (e) => {
    setSurat({ ...surat, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-[320px] flex-shrink-0">
        <Navigasi />
      </div>

      <div className="flex-1 flex flex-col">
        <div className="w-full bg-white shadow-md p-4 flex justify-end sticky top-0 z-30">
          <Logout />
        </div>

        <main className="flex-1 p-8">
          <div className="flex justify-between items-center mt-6 mb-6">
            <h2 className="text-2xl font-bold">Detail Surat Masuk</h2>
            <img
              src="/back.png"
              alt="back"
              width="20px"
              className="cursor-pointer"
              onClick={() => navigate("/kepsek/surat-masuk")}
            />
          </div>

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
              <p className="col-span-2">{surat.tanggalTerima}</p>
            </div>
            <div className="mb-4 grid grid-cols-3 gap-4">
              <h3 className="font-semibold">Sifat Surat</h3>
              <p className="col-span-2">{surat.sifatSurat}</p>
            </div>
            {surat.fileUrl && (
              <div className="mb-4 grid grid-cols-3 gap-4">
                <h3 className="font-semibold">File Lampiran</h3>
                <a
                  href={`http://localhost:2000${surat.fileUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="col-span-2 text-blue-500 underline"
                >
                  Lihat File
                </a>
              </div>
            )}
          </div>

            <h2 className="text-2xl font-bold mb-4 mt-4">Form Disposisi</h2>
          <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-3xl mt-6">

            <div className="mb-4 grid grid-cols-3 gap-4 items-center">
              <h3 className="font-semibold">Disposisikan ke</h3>
              <select
                name="disposisikanKe"
                className="col-span-2 p-2 border rounded"
                value={surat.disposisikanKe}
                onChange={handleChange}
              >
                <option value="">Pilih</option>
                <option value="admin-tu-1">Admin TU 1</option>
                <option value="admin-tu-2">Admin TU 2</option>
              </select>
            </div>

            <div className="mb-4 grid grid-cols-3 gap-4 items-start">
              <h3 className="font-semibold">Isi Disposisi</h3>
              <input
                type="text"
                name="isiDisposisi"
                className="col-span-2 p-2 border rounded"
                value={surat.isiDisposisi}
                onChange={handleChange}
                placeholder="Tulis isi disposisi..."
              />
            </div>

            <div className="mb-4 grid grid-cols-3 gap-4 items-center">
              <h3 className="font-semibold">Tenggat Waktu</h3>
              <input
                type="date"
                name="tenggatWaktu"
                className="col-span-2 p-2 border rounded"
                value={surat.tenggatWaktu}
                onChange={handleChange}
              />
            </div>
            <button className="bg-[#34542C] py-3 px-8 text-white">Kirim</button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DetailSuratMasuk;

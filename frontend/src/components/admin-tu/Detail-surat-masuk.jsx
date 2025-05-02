import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navigasi from "./Navigasi";

const Detailsuratmasuk = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Extract the `id` from URL parameters

  const [surat, setSurat] = useState(null); // Surat state to store fetched data

  useEffect(() => {
    const fetchSurat = async () => {
      try {
        const response = await fetch(
          `http://localhost:2000/api/surat-masuk/${id}`
        );
        if (!response.ok) {
          throw new Error("Gagal mengambil data surat Masuk");
        }
        const data = await response.json();
        setSurat(data);
      } catch (error) {
        console.error("Error fetching surat Masuk:", error);
      }
    };

    fetchSurat();
  }, [id]); // Dependency array with `id`, will refetch on id change

  const handleLogout = (e) => {
    e.preventDefault();
    navigate("/login"); // Redirect user to login page
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

          <h2 className="text-2xl font-bold mt-4">Detail Surat Masuk</h2>
        </div>

        {surat ? (
          <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-3xl">
            <div className="mb-4">
              <h3 className="font-semibold">No. Surat</h3>
              <p>{surat.noSurat}</p>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold">Perihal</h3>
              <p>{surat.perihal}</p>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold">Alamat Pengirim</h3>
              <p>{surat.alamatPengirim}</p>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold">Tanggal Terima</h3>
              <p>{surat.tanggalTerima?.slice(0, 10)}</p>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold">Sifat Surat</h3>
              <p>{surat.sifatSurat}</p>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold">Disposisi</h3>
              <p>{surat.disposisi}</p>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold">Isi Disposisi</h3>
              <p>{surat.isiDisposisi}</p>
            </div>

            {/* Display file upload if fileUrl is available */}
            {surat.fileUrl && (
              <div className="mb-4">
                <h3 className="font-semibold">File Surat</h3>
                <a
                  href={`http://localhost:2000${surat.fileUrl}`} // Adjust the URL as per your server's file serving method
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  Lihat File
                </a>
              </div>
            )}

            <div className="mt-6">
              <button
                onClick={() => navigate("/admin/rekap-surat-masuk")}
                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-md text-sm"
              >
                Kembali ke Rekap
              </button>
            </div>
          </div>
        ) : (
          <p>Loading...</p> // Show loading state while data is fetching
        )}
      </main>
    </div>
  );
};

export default Detailsuratmasuk;

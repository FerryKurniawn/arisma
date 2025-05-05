import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navigasi from "../Navigasi";
import Logout from "../../Logout";

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

        {surat ? (
          <div className=" bg-white rounded-lg shadow-md p-6 w-full max-w-3xl">
            <div className="mb-4 grid grid-cols-3 gap-4">
              <h3 className="font-semibold">No. Surat</h3>
              <p className="shadow">{surat.noSurat}</p>
            </div>
            <div className="mb-4 grid grid-cols-3 gap-4">
              <h3 className="font-semibold">Perihal</h3>
              <p>{surat.perihal}</p>
            </div>
            <div className="mb-4 grid grid-cols-3 gap-4">
              <h3 className="font-semibold">Alamat Pengirim</h3>
              <p>{surat.alamatPengirim}</p>
            </div>
            <div className="mb-4 grid grid-cols-3 gap-4">
              <h3 className="font-semibold">Tanggal Terima</h3>
              <p>{surat.tanggalTerima?.slice(0, 10)}</p>
            </div>
            <div className="mb-4 grid grid-cols-3 gap-4">
              <h3 className="font-semibold">Sifat Surat</h3>
              <p>{surat.sifatSurat}</p>
            </div>
            <div className="mb-4 grid grid-cols-3 gap-4">
              <h3 className="font-semibold">Disposisi</h3>
              <p>
                {surat.disposisi !== null &&
                surat.disposisi !== undefined &&
                surat.disposisi !== ""
                  ? surat.disposisi
                  : "-"}
              </p>
            </div>
            <div className="mb-4 grid grid-cols-3 gap-4">
              <h3 className="font-semibold">Isi Disposisi</h3>
              <p>
                {surat.isiDisposisi !== null &&
                surat.isiDisposisi !== undefined &&
                surat.isiDisposisi !== ""
                  ? surat.isiDisposisi
                  : "-"}
              </p>
            </div>

            {/* Display file upload if fileUrl is available */}
            {surat.fileUrl && (
              <div className="mb-4 grid grid-cols-3 gap-4">
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
          </div>
        ) : (
          <p>Loading...</p> // Show loading state while data is fetching
        )}
      </main>
    </div>
  );
};

export default Detailsuratmasuk;

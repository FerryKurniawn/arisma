import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navigasi from "../Kepsekvigasi";
import Logout from "../../Logout";
import SentAlert from "../../SentAlert"; // Import SentAlert

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

  const [adminList, setAdminList] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  // Fungsi untuk mengubah format tanggal menjadi DD-MM-YYYY
  const formatTanggal = (tanggal) => {
    const date = new Date(tanggal);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    const fetchSurat = async () => {
      try {
        const response = await fetch(
          `http://localhost:2000/api/surat-masuk/${id}`
        );
        const data = await response.json();

        setSurat({
          noSurat: data.noSurat,
          perihal: data.perihal,
          alamatPengirim: data.alamatPengirim,
          tanggalTerima: data.tanggalTerima
            ? formatTanggal(data.tanggalTerima)
            : "",
          sifatSurat: data.sifatSurat,
          isiDisposisi: data.isiDisposisi || "",
          fileUrl: data.fileUrl,
          disposisikanKe: "",
          tenggatWaktu: "",
        });
      } catch (error) {
        console.error("Error fetching surat masuk:", error);
      }
    };

    const fetchAdmins = async () => {
      try {
        const res = await fetch("http://localhost:2000/api/users?role=admin");
        const data = await res.json();
        setAdminList(data);
      } catch (error) {
        console.error("Gagal mengambil data admin:", error);
      }
    };

    fetchSurat();
    fetchAdmins();
  }, [id]);

  const handleChange = (e) => {
    setSurat({ ...surat, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi form: Pastikan semua field yang wajib diisi ada isinya
    if (!surat.disposisikanKe || !surat.isiDisposisi || !surat.tenggatWaktu) {
      alert("Semua field disposisi harus diisi.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:2000/api/surat-masuk/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          disposisi: surat.disposisikanKe,
          isiDisposisi: surat.isiDisposisi,
          tenggatWaktu: surat.tenggatWaktu,
        }),
      });

      if (res.ok) {
        setShowSuccess(true); // Show success alert if successful
      } else {
        alert("Gagal memperbarui surat disposisi.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Terjadi kesalahan.");
    }
  };

  const handleCloseAlert = () => {
    setShowSuccess(false);
    navigate("/kepsek/surat-masuk"); // Redirect after closing the alert
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
              <p className="col-span-2">
                {surat.sifatSurat == "SangatSegera"
                  ? "Sangat Segera"
                  : surat.sifatSurat}
              </p>
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
                {adminList.map((admin) => (
                  <option key={admin.id} value={admin.username}>
                    {admin.username}
                  </option>
                ))}
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

            <button
              onClick={handleSubmit}
              className="bg-[#34542C] py-3 px-8 text-white"
            >
              Kirim
            </button>
          </div>
        </main>
      </div>

      {/* Show success alert */}
      {showSuccess && <SentAlert onClose={handleCloseAlert} />}
    </div>
  );
};

export default DetailSuratMasuk;

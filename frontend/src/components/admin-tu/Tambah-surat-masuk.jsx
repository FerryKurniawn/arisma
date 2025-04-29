import React, { useState } from "react";
import Navigasi from "./Navigasi";
import { useNavigate } from "react-router-dom";
import InputForm from "../InputForm";

const TambahSuratMasuk = () => {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [noSurat, setNoSurat] = useState("");
  const [perihal, setPerihal] = useState("");
  const [alamatPengirim, setAlamatPengirim] = useState("");
  const [tanggalTerima, setTanggalTerima] = useState("");
  const [sifatSurat, setSifatSurat] = useState("");
  const [disposisi, setDisposisi] = useState("");
  const [isiDisposisi, setIsiDisposisi] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // handle Logout
  const handleLogout = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("noSurat", noSurat);
    formData.append("perihal", perihal);
    formData.append("alamatPengirim", alamatPengirim);
    formData.append("tanggalTerima", tanggalTerima);
    formData.append("sifatSurat", sifatSurat);
    formData.append("fileUrl", file); // appending file
    formData.append("disposisi", disposisi);
    formData.append("isiDisposisi", isiDisposisi);

    try {
      const response = await fetch("http://localhost:2000/api/surat-masuk", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Surat Masuk berhasil ditambahkan!");
        navigate("/admin/rekap-surat-masuk"); // Navigate to a different page (like dashboard)
      } else {
        alert("Terjadi kesalahan saat menambahkan Surat Masuk.");
      }
    } catch (error) {
      console.error("Error adding SuratMasuk:", error);
      alert("Terjadi kesalahan saat menghubungi server.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Navigasi />

      <main className="flex-1 p-8">
        <div className="flex flex-col items-start justify-between mb-6">
          <div className="flex items-center gap-4 ml-auto">
            <span className="text-sm font-medium">Admin TU 1</span>
            <button
              className="border px-3 py-1 rounded text-sm hover:bg-gray-200 transition"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>

          <h2 className="text-2xl font-bold mt-4">Tambah Surat Masuk</h2>
        </div>
        <div className="flex min-h-screen">
          <form
            className="flex flex-col gap-2 w-xl max-w-full"
            onSubmit={handleSubmit}
          >
            <InputForm
              label="No. Surat"
              placeholder="Masukkan No. Surat"
              value={noSurat}
              onChange={(e) => setNoSurat(e.target.value)}
            />
            <InputForm
              label="Perihal"
              placeholder="Masukkan Perihal"
              value={perihal}
              onChange={(e) => setPerihal(e.target.value)}
            />
            <InputForm
              label="Alamat Pengirim"
              placeholder="Masukkan Alamat Pengirim"
              value={alamatPengirim}
              onChange={(e) => setAlamatPengirim(e.target.value)}
            />
            <InputForm
              label="Tanggal Terima"
              placeholder="YYYY-DD-MM"
              value={tanggalTerima}
              onChange={(e) => setTanggalTerima(e.target.value)}
            />

            {/* Dropdown Select for Sifat Surat */}
            <div className="flex items-center gap-4 mb-4">
              <p className="font-medium w-64">Sifat Surat</p>
              <select
                className="w-full p-3 rounded-md bg-white text-black shadow focus:outline-none focus:ring-2 focus:ring-gray-300"
                value={sifatSurat}
                onChange={(e) => setSifatSurat(e.target.value)}
              >
                <option value="">Pilih</option>
                <option value="Sangat Segera">Sangat Segera</option>
                <option value="Segera">Segera</option>
                <option value="Biasa">Biasa</option>
              </select>
            </div>

            {/* File Upload */}
            <div className="flex items-center gap-4 mb-4">
              <p className="font-medium w-64">File Upload</p>
              <label className="w-full p-6 rounded-md text-center bg-white text-black shadow cursor-pointer">
                {file
                  ? file.name
                  : "Choose files or drag and drop files to upload"}
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>

            <InputForm
              label="Disposisi"
              placeholder="Masukkan Disposisi"
              value={disposisi}
              onChange={(e) => setDisposisi(e.target.value)}
            />
            <InputForm
              label="Isi Disposisi"
              placeholder="Masukkan Isi Disposisi"
              value={isiDisposisi}
              onChange={(e) => setIsiDisposisi(e.target.value)}
            />

            <button
              type="submit"
              className="mt-4 bg-gray-300 hover:bg-gray-400 text-black py-2 rounded-md"
            >
              Tambah
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default TambahSuratMasuk;

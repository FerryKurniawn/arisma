import React, { useState } from "react";
import Navigasi from "./Navigasi";
import { useNavigate } from "react-router-dom";
import InputForm from "../InputForm";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import CSS untuk DatePicker
import { format } from "date-fns";

const TambahSuratMasuk = () => {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [noSurat, setNoSurat] = useState("");
  const [perihal, setPerihal] = useState("");
  const [alamatPengirim, setAlamatPengirim] = useState("");
  const [tanggalTerima, setTanggalTerima] = useState(null);
  const [sifatSurat, setSifatSurat] = useState("");

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
    formData.append("tanggalTerima", format(tanggalTerima, "dd-MM-yyyy")); // Format tanggal
    formData.append("sifatSurat", sifatSurat);
    formData.append("fileUrl", file); // appending file

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
            className="flex flex-col gap-4 w-full max-w-4xl"
            onSubmit={handleSubmit}
          >
            {/* No. Surat */}
            <div className="flex items-center gap-4">
              <label className="font-medium w-64">No. Surat</label>
              <input
                type="text"
                placeholder="Masukkan No. Surat"
                value={noSurat}
                onChange={(e) => setNoSurat(e.target.value)}
                className="flex-1 p-3 rounded-md bg-white text-black shadow focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
            </div>

            {/* Perihal */}
            <div className="flex items-center gap-4">
              <label className="font-medium w-64">Perihal</label>
              <input
                type="text"
                placeholder="Masukkan Perihal"
                value={perihal}
                onChange={(e) => setPerihal(e.target.value)}
                className="flex-1 p-3 rounded-md bg-white text-black shadow focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
            </div>

            {/* Alamat Pengirim */}
            <div className="flex items-center gap-4">
              <label className="font-medium w-64">Alamat Pengirim</label>
              <input
                type="text"
                placeholder="Masukkan Alamat Pengirim"
                value={alamatPengirim}
                onChange={(e) => setAlamatPengirim(e.target.value)}
                className="flex-1 p-3 rounded-md bg-white text-black shadow focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
            </div>

            {/* Tanggal Terima */}
            <div className="flex items-center gap-4">
              <label className="font-medium w-64">Tanggal Terima</label>
              <DatePicker
                selected={tanggalTerima}
                onChange={(date) => setTanggalTerima(date)}
                dateFormat="dd-MM-yyyy"
                className="flex-1 p-3 rounded-md pr-[310px] bg-white text-black shadow focus:outline-none focus:ring-2 focus:ring-gray-300"
                placeholderText="DD-MM-YYYY"
              />
            </div>

            {/* Sifat Surat */}
            <div className="flex items-center gap-4">
              <label className="font-medium w-64">Sifat Surat</label>
              <select
                value={sifatSurat}
                onChange={(e) => setSifatSurat(e.target.value)}
                className="flex-1 p-3 rounded-md bg-white text-black shadow focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                <option value="">Pilih</option>
                <option value="Sangat Segera">Sangat Segera</option>
                <option value="Segera">Segera</option>
                <option value="Biasa">Biasa</option>
              </select>
            </div>

            {/* File Upload */}
            <div className="flex items-center gap-4">
              <label className="font-medium w-64">File Upload</label>
              <label className="flex-1 p-6 rounded-md text-center bg-white text-black shadow cursor-pointer">
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

            <button
              type="submit"
              className="self-start mt-4 bg-gray-300 hover:bg-gray-400 text-black py-2 px-6 rounded-md"
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

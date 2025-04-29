import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigasi from "../Navigasi";
import InputForm from "../../InputForm";

const TambahSuratKeluar = () => {
  const navigate = useNavigate();

  const [noSurat, setNoSurat] = useState("");
  const [noBerkas, setNoBerkas] = useState("");
  const [alamatPenerima, setAlamatPenerima] = useState("");
  const [tanggalKeluar, setTanggalKeluar] = useState("");
  const [perihal, setPerihal] = useState("");
  const [noPetunjuk, setNoPetunjuk] = useState("");
  const [noPaket, setNoPaket] = useState("");

  const handleLogout = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      noSurat,
      noBerkas,
      alamatPenerima,
      tanggalKeluar,
      perihal,
      noPetunjuk,
      noPaket,
    };

    try {
      const response = await fetch("http://localhost:2000/api/surat-keluar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Surat Keluar berhasil ditambahkan!");
        navigate("/admin/rekap-surat-keluar");
      } else {
        alert("Terjadi kesalahan saat menambahkan Surat Keluar.");
      }
    } catch (error) {
      console.error("Error adding Surat Keluar:", error);
      alert("Terjadi kesalahan saat menghubungi server.");
    }
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

          <h2 className="text-2xl font-bold mt-4">Tambah Surat Keluar</h2>
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
              label="No. Berkas"
              placeholder="Masukkan No. Berkas"
              value={noBerkas}
              onChange={(e) => setNoBerkas(e.target.value)}
            />
            <InputForm
              label="Alamat Penerima"
              placeholder="Masukkan Alamat Penerima"
              value={alamatPenerima}
              onChange={(e) => setAlamatPenerima(e.target.value)}
            />
            <InputForm
              label="Tanggal Keluar"
              placeholder="YYYY-MM-DD"
              value={tanggalKeluar}
              onChange={(e) => setTanggalKeluar(e.target.value)}
            />
            <InputForm
              label="Perihal"
              placeholder="Masukkan Perihal"
              value={perihal}
              onChange={(e) => setPerihal(e.target.value)}
            />
            <InputForm
              label="No. Petunjuk"
              placeholder="Masukkan No. Petunjuk"
              value={noPetunjuk}
              onChange={(e) => setNoPetunjuk(e.target.value)}
            />
            <InputForm
              label="No. Paket"
              placeholder="Masukkan No. Paket"
              value={noPaket}
              onChange={(e) => setNoPaket(e.target.value)}
            />

            <button
              type="submit"
              className="mt-4 bg-gray-300 hover:bg-gray-400 text-black py-2 rounded-md"
            >
              Tambah Surat
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default TambahSuratKeluar;

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navigasi from "../Navigasi";
import InputForm from "../../InputForm";

const EditSuratKeluar = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [noSurat, setNoSurat] = useState("");
  const [noBerkas, setNoBerkas] = useState("");
  const [alamatPenerima, setAlamatPenerima] = useState("");
  const [tanggalKeluar, setTanggalKeluar] = useState("");
  const [perihal, setPerihal] = useState("");
  const [noPetunjuk, setNoPetunjuk] = useState("");
  const [noPaket, setNoPaket] = useState("");

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

        setNoSurat(data.noSurat);
        setNoBerkas(data.noBerkas);
        setAlamatPenerima(data.alamatPenerima);
        setTanggalKeluar(data.tanggalKeluar.slice(0, 10));
        setPerihal(data.perihal);
        setNoPetunjuk(data.noPetunjuk);
        setNoPaket(data.noPaket);
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
      const response = await fetch(
        `http://localhost:2000/api/surat-keluar/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        alert("Surat Keluar berhasil diupdate!");
        navigate("/admin/rekap-surat-keluar");
      } else {
        alert("Terjadi kesalahan saat mengupdate Surat Keluar.");
      }
    } catch (error) {
      console.error("Error updating Surat Keluar:", error);
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

          <h2 className="text-2xl font-bold mt-4">Edit Surat Keluar</h2>
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
              Update Surat
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default EditSuratKeluar;

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navigasi from "../Navigasi";
import InputForm from "../../InputForm";
import Logout from "../../Logout";
import UpdateAlert from "../../UpdateAlert";

const EditSuratKeluar = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [file, setFile] = useState(null);
  const [noSurat, setNoSurat] = useState("");
  const [noBerkas, setNoBerkas] = useState("");
  const [alamatPenerima, setAlamatPenerima] = useState("");
  const [tanggalKeluar, setTanggalKeluar] = useState("");
  const [perihal, setPerihal] = useState("");
  const [noPetunjuk, setNoPetunjuk] = useState("");
  const [noPaket, setNoPaket] = useState("");
  const [originalData, setOriginalData] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const fetchSurat = async () => {
      try {
        const response = await fetch(
          `http://localhost:2000/api/surat-keluar/${id}`
        );
        if (!response.ok) throw new Error("Gagal mengambil data surat keluar");
        const data = await response.json();

        setNoSurat(data.noSurat);
        setNoBerkas(data.noBerkas);
        setAlamatPenerima(data.alamatPenerima);
        setTanggalKeluar(data.tanggalKeluar.slice(0, 10));
        setPerihal(data.perihal);
        setNoPetunjuk(data.noPetunjuk);
        setNoPaket(data.noPaket);

        setOriginalData({
          noSurat: data.noSurat,
          noBerkas: data.noBerkas,
          alamatPenerima: data.alamatPenerima,
          tanggalKeluar: data.tanggalKeluar.slice(0, 10),
          perihal: data.perihal,
          noPetunjuk: data.noPetunjuk,
          noPaket: data.noPaket,
        });
      } catch (error) {
        console.error("Error fetching surat keluar:", error);
      }
    };

    fetchSurat();
  }, [id]);

  const isChanged = () => {
    if (!originalData) return false;
    return (
      noSurat !== originalData.noSurat ||
      noBerkas !== originalData.noBerkas ||
      alamatPenerima !== originalData.alamatPenerima ||
      tanggalKeluar !== originalData.tanggalKeluar ||
      perihal !== originalData.perihal ||
      noPetunjuk !== originalData.noPetunjuk ||
      noPaket !== originalData.noPaket ||
      file !== null
    );
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("noSurat", noSurat);
      formData.append("noBerkas", noBerkas);
      formData.append("alamatPenerima", alamatPenerima);
      formData.append("tanggalKeluar", tanggalKeluar);
      formData.append("perihal", perihal);
      formData.append("noPetunjuk", noPetunjuk);
      formData.append("noPaket", noPaket);
      if (file) formData.append("fileUrl", file);

      const response = await fetch(
        `http://localhost:2000/api/surat-keluar/${id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (response.ok) {
        setShowSuccess(true);
      } else {
        alert("Terjadi kesalahan saat mengupdate Surat Keluar.");
      }
    } catch (error) {
      console.error("Error updating Surat Keluar:", error);
      alert("Terjadi kesalahan saat menghubungi server.");
    }
  };

  const handleCloseAlert = () => {
    setShowSuccess(false);
    navigate("/admin/rekap-surat-keluar");
  };

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
            <h2 className="text-2xl font-bold">Edit Surat Keluar</h2>
            <img
              src="/back.png"
              alt="back"
              width="20px"
              className="cursor-pointer"
              onClick={() => navigate("/admin/rekap-surat-keluar")}
            />
          </div>

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
              type="date"
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
            <InputForm
              label="Unggah File Baru"
              type="file"
              onChange={handleFileChange}
            />
            {file && (
              <p className="text-sm text-gray-600 mt-1">File: {file.name}</p>
            )}

            <button
              type="submit"
              disabled={!isChanged()}
              className={`mt-4 py-2 rounded-md ${
                isChanged()
                  ? "bg-[#34542C] hover:bg-[#34542C] text-black"
                  : "bg-[#34542C] opacity-70 text-gray-500 cursor-not-allowed"
              }`}
            >
              Perbarui Surat
            </button>
          </form>
        </main>
      </div>

      {showSuccess && <UpdateAlert onClose={handleCloseAlert} />}
    </div>
  );
};

export default EditSuratKeluar;

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navigasi from "../Navigasi";
import InputForm from "../../InputForm";
import Logout from "../../Logout";
import UpdateAlert from "../UpdateAlert"; // ✅ pastikan path ini sesuai

const EditSuratMasuk = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [file, setFile] = useState(null);
  const [noSurat, setNoSurat] = useState("");
  const [perihal, setPerihal] = useState("");
  const [alamatPengirim, setAlamatPengirim] = useState("");
  const [tanggalTerima, setTanggalTerima] = useState("");
  const [sifatSurat, setSifatSurat] = useState("");
  const [originalData, setOriginalData] = useState(null);

  const [showSuccess, setShowSuccess] = useState(false); // ✅ modal control

  useEffect(() => {
    const fetchSurat = async () => {
      try {
        const response = await fetch(
          `http://localhost:2000/api/surat-masuk/${id}`
        );
        if (!response.ok) throw new Error("Gagal mengambil data surat masuk");
        const data = await response.json();

        setNoSurat(data.noSurat);
        setPerihal(data.perihal);
        setAlamatPengirim(data.alamatPengirim);
        setTanggalTerima(data.tanggalTerima.slice(0, 10));
        setSifatSurat(data.sifatSurat);

        setOriginalData({
          noSurat: data.noSurat,
          perihal: data.perihal,
          alamatPengirim: data.alamatPengirim,
          tanggalTerima: data.tanggalTerima.slice(0, 10),
          sifatSurat: data.sifatSurat,
        });
      } catch (error) {
        console.error("Error fetching surat masuk:", error);
      }
    };

    fetchSurat();
  }, [id]);

  const isChanged = () => {
    if (!originalData) return false;
    return (
      noSurat !== originalData.noSurat ||
      perihal !== originalData.perihal ||
      alamatPengirim !== originalData.alamatPengirim ||
      tanggalTerima !== originalData.tanggalTerima ||
      sifatSurat !== originalData.sifatSurat ||
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
      formData.append("perihal", perihal);
      formData.append("alamatPengirim", alamatPengirim);
      formData.append("tanggalTerima", tanggalTerima);
      formData.append("sifatSurat", sifatSurat);
      if (file) formData.append("fileUrl", file);

      const response = await fetch(
        `http://localhost:2000/api/surat-masuk/${id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (response.ok) {
        setShowSuccess(true); // ✅ tampilkan modal
      } else {
        alert("Terjadi kesalahan saat mengupdate Surat Masuk.");
      }
    } catch (error) {
      console.error("Error updating SuratMasuk:", error);
      alert("Terjadi kesalahan saat menghubungi server.");
    }
  };

  const handleCloseAlert = () => {
    setShowSuccess(false);
    navigate("/admin/rekap-surat-masuk");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Navigasi />

      <div className="flex-1 flex flex-col">
        <div className="w-full bg-white shadow-md p-4 flex justify-end sticky top-0 z-30">
          <Logout />
        </div>

        <main className="flex-1 p-8">
          <div className="flex justify-between items-center mt-6 mb-6">
            <h2 className="text-2xl font-bold">Edit Surat Masuk</h2>
            <img
              src="/back.png"
              alt="back"
              width="20px"
              className="cursor-pointer"
              onClick={() => navigate("/admin/rekap-surat-masuk")}
            />
          </div>

          <form
            className="flex flex-col gap-4 w-full max-w-3xl bg-white rounded-lg shadow-md p-6"
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
              placeholder="YYYY-MM-DD"
              value={tanggalTerima}
              onChange={(e) => setTanggalTerima(e.target.value)}
            />

            <div className="flex items-center gap-4">
              <p className="font-medium w-64">Sifat Surat</p>
              <select
                className="w-full p-3 rounded-md bg-white text-black shadow focus:outline-none focus:ring-2 focus:ring-gray-300"
                value={sifatSurat}
                onChange={(e) => setSifatSurat(e.target.value)}
              >
                <option value="">Pilih</option>
                <option value="SangatSegera">Sangat Segera</option>
                <option value="Segera">Segera</option>
                <option value="Biasa">Biasa</option>
              </select>
            </div>

            <label className="w-full p-6 border rounded-md text-center bg-white text-black shadow cursor-pointer">
              {file ? file.name : "Pilih file baru untuk upload (optional)"}
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>

            <button
              type="submit"
              disabled={!isChanged()}
              className={`mt-4 py-2 rounded-md ${
                isChanged()
                  ? "bg-gray-300 hover:bg-gray-400 text-black"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              Perbarui
            </button>
          </form>
        </main>
      </div>

      {/* ✅ Modal Alert */}
      {showSuccess && <UpdateAlert onClose={handleCloseAlert} />}
    </div>
  );
};

export default EditSuratMasuk;

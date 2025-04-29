import React, { useState, useEffect } from "react";
import Navigasi from "../Navigasi";
import { useNavigate } from "react-router-dom";

const RekapSuratKeluar = () => {
  const navigate = useNavigate();
  const [dataSurat, setDataSurat] = useState([]);

  const fetchSuratKeluar = () => {
    fetch("http://localhost:2000/api/surat-keluar")
      .then((res) => res.json())
      .then((data) => setDataSurat(data))
      .catch((err) =>
        console.error("Gagal fetch data surat keluar:", err.message)
      );
  };

  useEffect(() => {
    fetchSuratKeluar();
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  const handleDelete = async (id) => {
    if (confirm("Yakin ingin menghapus surat ini?")) {
      try {
        const res = await fetch(
          `http://localhost:2000/api/surat-keluar/${id}`,
          {
            method: "DELETE",
          }
        );
        if (res.ok) {
          fetchSuratKeluar(); // Refresh data
        } else {
          alert("Gagal menghapus surat.");
        }
      } catch (err) {
        console.error("Error saat hapus surat:", err);
        alert("Terjadi kesalahan.");
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Navigasi />

      <main className="flex-1 p-8">
        <div className="flex flex-col mb-6">
          <div className="flex items-center gap-4 ml-auto mb-5">
            <span className="text-sm font-medium">Admin TU</span>
            <button
              className="border px-3 py-1 rounded text-sm hover:bg-gray-200 transition"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Rekap Surat Keluar</h2>
            <div className="flex items-center gap-2">
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Cari"
                  className="w-full border rounded-md py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
                <div className="absolute right-3 top-2.5 text-gray-400">
                  <img src="/search.png" width="15px" />
                </div>
              </div>
              <button className="bg-gray-300 hover:bg-gray-400 px-6 py-2 text-sm rounded-md">
                Cari
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-md overflow-x-auto">
          <table className="min-w-full text-sm table-fixed">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-center font-semibold">No. Surat</th>
                <th className="p-3 text-center font-semibold">No. Berkas</th>
                <th className="p-3 text-center font-semibold">
                  Alamat Penerima
                </th>
                <th className="p-3 text-center font-semibold">
                  Tanggal Keluar
                </th>
                <th className="p-3 text-center font-semibold">Perihal</th>
                <th className="p-3 text-center font-semibold">No. Petunjuk</th>
                <th className="p-3 text-center font-semibold">No. Paket</th>
                <th className="p-3 text-center font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {dataSurat.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-5">
                    Tidak ada data tersedia.
                  </td>
                </tr>
              ) : (
                dataSurat.map((surat) => (
                  <tr key={surat.id} className="border-t">
                    <td className="p-3 text-center">{surat.noSurat}</td>
                    <td className="p-3 text-center">{surat.noBerkas}</td>
                    <td className="p-3 text-center">{surat.alamatPenerima}</td>
                    <td className="p-3 text-center">{surat.tanggalKeluar}</td>
                    <td className="p-3 text-center">{surat.perihal}</td>
                    <td className="p-3 text-center">{surat.noPetunjuk}</td>
                    <td className="p-3 text-center">{surat.noPaket}</td>
                    <td className="p-3 flex justify-center items-center gap-3 mt-3">
                      <button
                        onClick={() => navigate("/admin/detail-surat-keluar")}
                      >
                        <img src="/eye.png" width="68" alt="View" />
                      </button>
                      <button
                        onClick={() => navigate("/admin/edit-surat-keluar")}
                      >
                        <img src="/pencil.png" width="50" alt="Edit" />
                      </button>
                      <button onClick={() => handleDelete(surat.id)}>
                        <img src="/trash-can.png" width="50" alt="Delete" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end mt-6">
          <button
            className="bg-gray-300 hover:bg-gray-400 px-8 py-2 rounded-md text-sm"
            disabled
          >
            Tambah
          </button>
        </div>
      </main>
    </div>
  );
};

export default RekapSuratKeluar;

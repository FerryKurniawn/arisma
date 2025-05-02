import React, { useState, useEffect } from "react";
import Navigasi from "../Navigasi";
import { useNavigate } from "react-router-dom";

const RekapSuaraKeluar = () => {
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
                <th
                  className="p-3 text-center font-semibold"
                  style={{ width: "150px" }}
                >
                  No. Surat
                </th>
                <th
                  className="p-3 text-center font-semibold"
                  style={{ width: "200px" }}
                >
                  No. Berkas
                </th>
                <th
                  className="p-3 text-center font-semibold"
                  style={{ width: "200px" }}
                >
                  Alamat Penerima
                </th>
                <th
                  className="p-10 text-center font-semibold"
                  style={{ width: "200px" }} // Membesarkan kolom Tanggal Terima
                >
                  Tanggal keluar
                </th>

                <th
                  className="p-3 text-center font-semibold"
                  style={{ width: "150px" }}
                >
                  Perihal
                </th>
                <th
                  className="p-3 text-center font-semibold"
                  style={{ width: "150px" }}
                >
                  No. Petunjuk
                </th>
                <th
                  className="p-3 text-center font-semibold"
                  style={{ width: "200px" }}
                >
                  No. Paket
                </th>
                <th
                  className="p-3 text-center font-semibold"
                  style={{ width: "200px" }}
                >
                  Aksi
                </th>
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
                    <td
                      className="p-3 flex justify-center items-center gap-3 mt-3"
                      style={{ minWidth: "200px" }}
                    >
                      <button
                        onClick={() =>
                          navigate(`/admin/detail-surat-keluar/${surat.id}`)
                        }
                      >
                        <img
                          src="/eye.png"
                          width="20"
                          className="mt-1"
                          alt="View"
                        />
                      </button>
                      <button
                        onClick={() =>
                          navigate(`/admin/edit-surat-keluar/${surat.id}`)
                        }
                      >
                        <img src="/pencil.png" width="15" alt="Edit" />
                      </button>
                      <button onClick={() => handleDelete(surat.id)}>
                        <img src="/trash-can.png" width="15" alt="Delete" />
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
            onClick={() => navigate("/admin/tambah-surat-keluar")}
          >
            Tambah
          </button>
        </div>
      </main>
    </div>
  );
};

export default RekapSuaraKeluar;

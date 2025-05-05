import React, { useState, useEffect } from "react";
import Navigasi from "../Navigasi";
import Delete from "../Delete";
import Logout from "../../Logout";
import { useNavigate } from "react-router-dom";

const RekapSuratKeluar = () => {
  const navigate = useNavigate();
  const [dataSurat, setDataSurat] = useState([]);
  const [filteredSurat, setFilteredSurat] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const fetchSuratKeluar = () => {
    fetch("http://localhost:2000/api/surat-keluar")
      .then((res) => res.json())
      .then((data) => {
        setDataSurat(data);
        setFilteredSurat(data);
      })
      .catch((err) =>
        console.error("Gagal fetch data surat keluar:", err.message)
      );
  };

  useEffect(() => {
    fetchSuratKeluar();
  }, []);

  const handleSearch = () => {
    const filtered = dataSurat.filter((surat) => {
      const search = searchTerm.toLowerCase();
      return (
        surat.noSurat.toLowerCase().includes(search) ||
        surat.noBerkas.toLowerCase().includes(search) ||
        surat.alamatPenerima.toLowerCase().includes(search) ||
        surat.tanggalKeluar.toLowerCase().includes(search) ||
        surat.perihal.toLowerCase().includes(search) ||
        surat.noPetunjuk.toLowerCase().includes(search) ||
        surat.noPaket.toLowerCase().includes(search)
      );
    });

    setFilteredSurat(filtered);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:2000/api/surat-keluar/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchSuratKeluar();
      } else {
        alert("Gagal menghapus surat.");
      }
    } catch (err) {
      console.error("Error saat hapus surat:", err);
      alert("Terjadi kesalahan.");
    } finally {
      setShowDeleteModal(false);
      setSelectedId(null);
    }
  };

  const openDeleteModal = (id) => {
    setSelectedId(id);
    setShowDeleteModal(true);
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <Navigasi />

      {/* Main Content */}
      <main className="flex-1 bg-[#d9d9d9] min-h-screen relative">
        {/* Sticky top bar with Logout */}
        <div className="w-full bg-white shadow-md p-4 flex justify-end sticky top-0 z-20">
          <Logout />
        </div>

        <div className="p-8">
          {/* Header and Search */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Rekap Surat Keluar</h2>
            <div className="flex items-center gap-2">
              <div className="relative flex-1 max-w-md bg-white rounded-md">
                <input
                  type="text"
                  placeholder="Cari"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearch();
                  }}
                  className="w-full border rounded-md py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
                <div className="absolute right-3 top-2.5 text-gray-400">
                  <img src="/search.png" width="15px" />
                </div>
              </div>
              <button
                className="bg-[#34542C] hover:bg-gray-400 text-white px-6 py-2 text-sm rounded-md"
                onClick={handleSearch}
              >
                Cari
              </button>
            </div>
          </div>

          {/* Table Surat Keluar */}
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
                    style={{ width: "200px" }}
                  >
                    Tanggal Keluar
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
                {filteredSurat.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center py-5">
                      Tidak ada data tersedia.
                    </td>
                  </tr>
                ) : (
                  filteredSurat.map((surat, index) => (
                    <tr
                      key={surat.id}
                      className="border-t"
                      style={
                        index % 2 === 0
                          ? { backgroundColor: "rgba(217, 217, 217, 0.5)" }
                          : {}
                      }
                    >
                      <td className="p-3 text-center">{surat.noSurat}</td>
                      <td className="p-3 text-center">{surat.noBerkas}</td>
                      <td className="p-3 text-center">
                        {surat.alamatPenerima}
                      </td>
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
                        <button onClick={() => openDeleteModal(surat.id)}>
                          <img src="/trash-can.png" width="15" alt="Delete" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Button Tambah */}
          <div className="flex justify-end mt-6">
            <button
              className="bg-[#34542C] text-white hover:bg-gray-400 px-8 py-2 rounded-md text-sm"
              onClick={() => navigate("/admin/tambah-surat-keluar")}
            >
              Tambah
            </button>
          </div>
        </div>

        {/* Delete Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <Delete
              onDelete={() => handleDelete(selectedId)}
              onCancel={() => {
                setShowDeleteModal(false);
                setSelectedId(null);
              }}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default RekapSuratKeluar;

import React, { useState } from "react";
import Navigasi from "../Kepsekvigasi";
import Logout from "../../Logout";
import { useNavigate, useParams } from "react-router-dom";
import Delete from "../../admin-tu/Delete";

const DaftarDisposisi = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [dataSurat, setDataSurat] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const openDeleteModal = (id) => {
    setSelectedId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = (id) => {
    // Logika penghapusan (simulasi)
    setDataSurat(dataSurat.filter((item) => item.id !== id));
    setShowDeleteModal(false);
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Navigasi />

      <main className="flex-1 p-8 relative">
        <div className="flex flex-col mb-6 bg-white">
          <div className="flex items-center gap-4 ml-auto mb-5">
            <Logout />
          </div>

          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Daftar Disposisi</h2>
            <div className="flex items-center gap-2">
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Cari"
                  className="w-full border rounded-md py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
                <div className="absolute right-3 top-2.5 text-gray-400">
                  <img src="/search.png" width="15px" alt="Search" />
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
                <th className="p-3 text-center font-semibold" style={{ width: "150px" }}>No. Surat</th>
                <th className="p-3 text-center font-semibold" style={{ width: "200px" }}>Perihal</th>
                <th className="p-3 text-center font-semibold" style={{ width: "200px" }}>Alamat Pengirim</th>
                <th className="p-3 text-center font-semibold" style={{ width: "200px" }}>Tanggal Terima</th>
                <th className="p-3 text-center font-semibold" style={{ width: "150px" }}>Sifat Surat</th>
                <th className="p-3 text-center font-semibold" style={{ width: "150px" }}>Disposisi</th>
                <th className="p-3 text-center font-semibold" style={{ width: "200px" }}>Tenggat Waktu</th>
                <th className="p-3 text-center font-semibold" style={{ width: "200px" }}>Aksi</th>
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
                dataSurat.map((surat, index) => (
                  <tr
                    key={surat.id}
                    className="border-t"
                    style={index % 2 === 0 ? { backgroundColor: "rgba(217, 217, 217, 0.5)" } : {}}
                  >
                    <td className="p-3 text-center">{surat.noSurat}</td>
                    <td className="p-3 text-center">{surat.perihal}</td>
                    <td className="p-3 text-center">{surat.alamatPengirim}</td>
                    <td className="p-3 text-center">{surat.tanggalTerima}</td>
                    <td className="p-3 text-center">
                      {surat.sifatSurat === "SangatSegera" ? "Sangat Segera" : surat.sifatSurat}
                    </td>
                    <td className="p-3 text-center">{surat.disposisi || "-"}</td>
                    <td className="p-3 text-center">{surat.tenggatWaktu || "-"}</td>
                    <td className="p-3 flex justify-center items-center gap-3">
                      <button onClick={() => navigate(`/kepsek/Detail-disposisi/${surat.id}`)}>
                        <img src="/eye.png" width="20" className="mt-1" alt="Lihat" />
                      </button>
                      <button onClick={() => navigate(`/kepsek/edit-disposisi/${surat.id}`)}>
                        <img src="/pencil.png" width="15" alt="Edit" />
                      </button>
                      <button onClick={() => openDeleteModal(surat.id)}>
                        <img src="/trash-can.png" width="15" alt="Hapus" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {showDeleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
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

export default DaftarDisposisi;

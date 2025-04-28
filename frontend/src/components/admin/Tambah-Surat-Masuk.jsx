import React, { useState } from "react";
import Sidebar from "./Sidebar";

export default function SuratMasukForm() {
  const [page, setPage] = useState("suratMasuk");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      {sidebarOpen && <Sidebar setPage={setPage} />}

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
          sidebarOpen ? "ml-[250px]" : "ml-0"
        }`}
      >
        {/* Navbar */}
        <nav className="w-full bg-white shadow px-6 py-4 flex items-center">
  <div className="ml-auto relative group">
    <button className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">
      Admin TU 1
    </button>
    <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg hidden group-hover:block z-10">
      <ul>
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profil</li>
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Keluar</li>
      </ul>
    </div>
  </div>
</nav>

        {/* Form Surat Masuk */}
        {page === "suratMasuk" && (
          <main className="flex-1 p-10">
            <div className="flex justify-between items-center max-w-3xl ml-16">
              <h1 className="text-2xl font-semibold">Tambah Surat Masuk</h1>
              <button className="text-gray-600 hover:text-black text-xl">↩</button>
            </div>

            <form className="mt-8 space-y-6 max-w-3xl w-full px-4 ml-16">
              <div>
                <label className="block font-medium">No. Surat</label>
                <input type="text" className="w-full border rounded px-4 py-2" />
              </div>

              <div>
                <label className="block font-medium">Perihal</label>
                <textarea className="w-full border rounded px-4 py-2" />
              </div>

              <div>
                <label className="block font-medium">Alamat Pengirim</label>
                <input type="text" className="w-full border rounded px-4 py-2" />
              </div>

              <div>
                <label className="block font-medium">Tanggal Terima</label>
                <input
                  type="text"
                  className="w-full border rounded px-4 py-2"
                  placeholder="DD/MM/YYYY"
                />
              </div>

              <div>
                <label className="block font-medium">Sifat Surat</label>
                <select className="w-full border rounded px-4 py-2">
                  <option value="sangat-segera">Sangat Segera</option>
                  <option value="segera">Segera</option>
                  <option value="biasa">Biasa</option>
                </select>
              </div>

              <div>
                <label className="block font-medium">Disposisi</label>
                <textarea className="w-full border rounded px-4 py-2" />
              </div>

              <div>
                <label className="block font-medium">Isi Disposisi</label>
                <textarea className="w-full border rounded px-4 py-2 h-28" />
              </div>

              <div>
                <label className="block font-medium">Tambah File Surat</label>
                <input
                  type="file"
                  className="w-full border rounded px-4 py-2 bg-white"
                />
              </div>

              <div className="pt-4 text-center">
                <button
                  type="submit"
                  className="bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-10 rounded"
                >
                  Tambah
                </button>
              </div>
            </form>
          </main>
        )}
      </div>
    </div>
  );
}

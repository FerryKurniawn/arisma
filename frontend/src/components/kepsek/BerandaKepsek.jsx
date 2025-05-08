import React, { useEffect, useState } from "react";
import Navigasi from "./Kepsekvigasi";
import Logout from "../Logout";
import axios from "axios";

const BerandaKepsek = () => {
  const [dashboardData, setDashboardData] = useState({
    totalMasuk: 0,
    totalKeluar: 0,
    rekap: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:2000/api/dashboard");
        setDashboardData(res.data);
      } catch (err) {
        console.error("Gagal fetch dashboard", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen bg-white">
      <div className="w-[320px] flex-shrink-0">
        <Navigasi />
      </div>

      <main className="flex-1 bg-gray-100 min-h-screen relative">
        <div className="w-full bg-white shadow-md p-4 flex justify-end sticky top-0 z-20">
          <Logout />
        </div>

        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Dashboard</h2>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow text-center py-6">
              <h3 className="font-semibold">Jumlah Surat Masuk</h3>
              <p className="text-4xl font-bold">{dashboardData.totalMasuk}</p>
            </div>
            <div className="bg-white rounded-xl shadow text-center py-6">
              <h3 className="font-semibold">Jumlah Surat Keluar</h3>
              <p className="text-4xl font-bold">{dashboardData.totalKeluar}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-4">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-green-900 text-white">
                  <th className="px-4 py-2 text-left">Tahun</th>
                  <th className="px-4 py-2 text-left">Surat Masuk</th>
                  <th className="px-4 py-2 text-left">Disposisi</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.rekap.map((item) => (
                  <tr key={item.tahun} className="border-b">
                    <td className="px-4 py-2">{item.tahun}</td>
                    <td className="px-4 py-2">{item.masuk}</td>
                    <td className="px-4 py-2">{item.disposisi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BerandaKepsek;

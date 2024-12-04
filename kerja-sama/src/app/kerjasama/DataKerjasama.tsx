"use client";

import { useEffect, useState } from "react";

// Type untuk data Kerjasama
type KerjasamaType = {
  id: number;
  nomor_kerjasama: string;
  tipe: string;
  judul: string;
  instansi: string;
  tanggal_akhir: string;
  status: string;
};

export default function DataKerjasama() {
  const [kerjasamaData, setKerjasamaData] = useState<KerjasamaType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fungsi untuk mengambil data dari API
  const fetchKerjasama = async () => {
    try {
      const response = await fetch("/api/kerjasama"); // Sesuaikan endpoint Anda
      const data = await response.json();
      setKerjasamaData(data.data); // Pastikan struktur `data.data` sesuai dengan API
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKerjasama();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-left dark:bg-meta-4">
              <th className="px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                No
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Nomor Kerjasama
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Tipe
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Judul
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Instansi
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Tanggal Akhir
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Status
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {kerjasamaData.map((item, index) => (
              <tr key={item.id}>
                <td className="px-4 py-4">{index + 1}</td>
                <td className="px-4 py-4">{item.nomor_kerjasama}</td>
                <td className="px-4 py-4">{item.tipe}</td>
                <td className="px-4 py-4">{item.judul}</td>
                <td className="px-4 py-4">{item.instansi}</td>
                <td className="px-4 py-4">{item.tanggal_akhir}</td>
                <td className="px-4 py-4">{item.status}</td>
                <td className="px-4 py-4 flex gap-2">
                  {/* Aksi seperti edit dan hapus */}
                  <button className="hover:text-primary">
                    Edit
                  </button>
                  <button className="hover:text-primary">
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

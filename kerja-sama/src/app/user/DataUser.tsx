'use client';

import { useState, useEffect } from "react";

export default function DataUser() {
  const [users, setUsers] = useState([]); // State untuk menyimpan data pengguna
  const [isLoading, setIsLoading] = useState(true); // State untuk loading

  // Fungsi untuk mengambil data dari API
  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/user"); // Pastikan endpoint API sesuai
      const result = await response.json();
      setUsers(result.data); // Simpan data dari API ke state
      setIsLoading(false); // Matikan loading
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  // Gunakan useEffect untuk memanggil API saat komponen dimuat
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="flex flex-col gap-10">
      {/* Header Tabel */}
      <div className="grid grid-cols-3 rounded-sm bg-gray-200 dark:bg-meta-4 sm:grid-cols-5">
        <div className="p-1.5 xl:p-5">
          <h5 className="text-sm font-medium text-black dark:text-white xsm:text-base">
            Nama
          </h5>
        </div>
        <div className="p-1.5 text-center xl:p-5">
          <h5 className="text-sm font-medium text-black dark:text-white xsm:text-base">
            Email
          </h5>
        </div>
        <div className="p-1.5 text-center xl:p-5">
          <h5 className="text-sm font-medium text-black dark:text-white xsm:text-base">
            Password
          </h5>
        </div>
        <div className="hidden p-1.5 text-center sm:block xl:p-5">
          <h5 className="text-sm font-medium text-black dark:text-white xsm:text-base">
            Role
          </h5>
        </div>
        <div className="hidden p-1.5 text-center sm:block xl:p-5">
          <h5 className="text-sm font-medium text-black dark:text-white xsm:text-base">
            Aksi
          </h5>
        </div>
      </div>

      {/* Konten Tabel */}
      {isLoading ? (
        <p className="text-center text-gray-500">Loading data...</p>
      ) : (
        users.map((user: any) => (
          <div
            key={user.id}
            className="grid grid-cols-3 items-center rounded-sm border-b bg-white dark:bg-meta-4 sm:grid-cols-5"
          >
            <div className="p-1.5 xl:p-5">
              <p className="text-sm text-black dark:text-white">{user.nama_user}</p>
            </div>
            <div className="p-1.5 text-center xl:p-5">
              <p className="text-sm text-black dark:text-white">{user.email}</p>
            </div>
            <div className="p-1.5 text-center xl:p-5">
              <p className="text-sm text-black dark:text-white">••••••••</p>
            </div>
            <div className="hidden p-1.5 text-center sm:block xl:p-5">
              <p className="text-sm text-black dark:text-white">{user.role}</p>
            </div>
            <div className="hidden p-1.5 text-center sm:block xl:p-5">
              <button
                className="px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-500"
                onClick={() => console.log(`Delete user: ${user.id}`)}
              >
                Hapus
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import EditUser from './edit';

type User = {
  id: number;
  nama_user: string;
  email: string;
  password: string;
  role: string;
};

export default function DataUser() {
  const [users, setUsers] = useState<User[]>([]); // Menyimpan data pengguna
  const [loading, setLoading] = useState(true); // Indikator loading
  const [error, setError] = useState<string | null>(null); // Menyimpan error jika ada

  // Fungsi untuk mengambil data dari API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/users');
        const data = await response.json();
        if (response.ok) {
          setUsers(data.data); 
        } else {
          setError(data.msg || 'Gagal memuat data');
        }
      } catch (err) {
        setError('Terjadi kesalahan saat memuat data');
      } finally {
        setLoading(false); 
      }
    };
    fetchData();
  }, []);

  //menghapus data
  const handleDelete = async (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus pengguna ini?')) {
      try {
        const response = await fetch(`/api/users?id=${id}`, { method: 'DELETE' });
        const result = await response.json();
        if (response.ok) {
          setUsers(users.filter((user) => user.id !== id)); 
          alert(result.msg); // Pesan sukses
        } else {
          alert(result.msg);  
        }
      } catch (err) {
        alert('Gagal menghapus data pengguna');
      }
    }
  };
  

  return (
    <div className="flex flex-col gap-10">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <table className="w-full table-auto border border-gray-300">
          <thead>
            <tr className="bg-gray-200 dark:bg-meta-4">
              <th className="px-4 py-4 font-bold text-black text-center dark:text-white">No</th>
              <th className="px-4 py-4 font-bold text-black text-center dark:text-white">Nama User</th>
              <th className="px-4 py-4 font-bold text-black text-center dark:text-white">Email</th>
              <th className="px-4 py-4 font-bold text-black text-center dark:text-white">Role</th>
              <th className="px-4 py-4 font-bold text-black text-center dark:text-white">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id} className="border-b border-gray-300 hover:bg-gray-100">
                <td className="px-3 py-3 text-center">{index + 1}</td>
                <td className="px-3 py-3 text-center">{user.nama_user}</td>
                <td className="px-3 py-3 text-center">{user.email}</td>
                <td className="px-3 py-3 text-center">{user.role}</td>
                <td className="px-3 py-3 text-center">
                  <EditUser user={user} />

                  <button className="hover:text-red" onClick={()=> handleDelete(user.id)}>
                    <svg
                      className="fill-current"
                      width="21"
                      height="21"
                      viewBox="0 0 21 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                        fill=""
                      />
                      <path
                        d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                        fill=""
                      />
                      <path
                        d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                        fill=""
                      />
                      <path
                        d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                        fill=""
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

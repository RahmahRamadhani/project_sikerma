'use client'

import { useState, useEffect } from 'react';
import Modal from "@/components/Modal/Modals";

export default function EditUser({ user }: { user: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [namaUser, setNamaUser] = useState(user.nama_user);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [role, setRole] = useState(user.role);

  const handleModal = () => setIsOpen(!isOpen);

  const handleSave = async () => {
    const updatedUser = {
      nama_user: namaUser,
      email: email,
      password: password,
      role: role,
    };

    try {
      // Kirim data yang sudah diubah ke server (menggunakan PUT)
      const response = await fetch(`/api/users?id=${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });

      const result = await response.json();
      if (response.ok) {
        // onSave(result.data);  // Memanggil callback untuk menyimpan perubahan
        alert(result.msg);
      } else {
        alert(result.msg);
      }
    } catch (err) {
      alert('Gagal memperbarui data pengguna');
    }

    setIsOpen(false);
  };

  return (
    <>
      <button className="hover:text-primary" onClick={handleModal}>
        <svg viewBox="0 0 28 28" stroke-width="1.5" stroke="currentColor"
          className="size-6"
          width="18"
          height="18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
        </svg>
      </button>

      <Modal isOpen={isOpen} onClose={handleModal}>
      <h2 className="text-xl font-bold mb-4">Edit Data User</h2>
        <label className="block  text-left mt-2 font-medium text-gray-700">Nama User</label>
        <input
          type="text"
          value={namaUser}
          onChange={(e) => setNamaUser(e.target.value)}
          className="w-full border rounded-md px-2 py-1"
        />

        <label className="block text-left mt-2 font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-md px-2 py-1"
        />

        <label className="block text-left mt-2 font-medium text-gray-700">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded-md px-2 py-1"
        />

        <label className="block  text-left mt-2 font-medium text-gray-700">Role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border rounded-md px-2 py-1"
        >
          <option value="" disabled>Pilih Role</option>
          <option value="admin">Admin</option>
          <option value="staff">Staff</option>
          <option value="mitra">Mitra</option>
        </select>

        <button onClick={handleSave} className="bg-green-600 text-white px-4 py-2 rounded-md mt-4">
          Simpan
        </button> 
      </Modal>
    </>
  );
}

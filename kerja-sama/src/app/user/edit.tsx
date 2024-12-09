'use client'

import { useState, useEffect } from 'react';
import Modal from "@/components/Modal/Modals";

export default function EditUser({ user, onSave }: { user: any, onSave: (userData: any) => void }) {
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
        onSave(result.data);  // Memanggil callback untuk menyimpan perubahan
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
      <button onClick={handleModal} className="bg-blue-600 text-white px-4 py-2 rounded-md">
        Edit User
      </button>

      <Modal isOpen={isOpen} onClose={handleModal}>
        <label className="block">Nama User</label>
        <input
          type="text"
          value={namaUser}
          onChange={(e) => setNamaUser(e.target.value)}
          className="w-full border rounded-md px-2 py-1"
        />

        <label className="block">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-md px-2 py-1"
        />

        <label className="block">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded-md px-2 py-1"
        />

        <label className="block">Role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border rounded-md px-2 py-1"
        >
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

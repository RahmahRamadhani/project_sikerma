'use client'

import Modal from "@/components/Modal/Modals";
import { useState } from "react";

export default function AddUser() {
    //state untuk kontrol modal
    const [isOpen, setIsOpen] = useState(false);
    const handleModal = () => setIsOpen(!isOpen);

// State untuk input data user
const [namaUser, setNamaUser] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [role, setRole] = useState('');

// Fungsi untuk menangani form submission (menambahkan user)
const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Menghentikan form dari refresh otomatis

    const newUser = {
      nama_user: namaUser,
      email: email,
      password: password,
      role: role,
    };

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.msg); // Menampilkan pesan sukses
        handleModal(); // Menutup modal setelah sukses
        // Reset form
        setNamaUser('');
        setEmail('');
        setPassword('');
        setRole('');
      } else {
        alert(result.msg); // Pesan error dari API
      }
    } catch (error) {
      console.error('Error menambahkan user:', error);
      alert('Gagal menambahkan user');
    }
  };

    return (
        <>
            <button onClick={handleModal} className="flex items-center bg-blue-600 text-white px-2 h-9 py-1 rounded-md hover:bg-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 25 25" stroke-width="1.5" stroke="currentColor" className="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                Tambah</button>
            <Modal
                isOpen={isOpen}
                onClose={handleModal}
                children={
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="nama_user" className="block text-sm mt-2 font-medium text-gray-700">Nama User</label>
                        <input type="text" id="nama_user" value={namaUser} onChange={(e) => setNamaUser(e.target.value)} placeholder="Masukkan Nama User" className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 border-[1.5px] px-2 py-3 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter" />

                        <label htmlFor="email" className="block text-sm mt-2 font-medium text-gray-700">Email</label>
                        <input type="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Masukkan Email" className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 border-[1.5px] px-2 py-3 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter" />


                        <label htmlFor="password" className="block text-sm mt-2 font-medium text-gray-700">Password</label>
                        <input type="password" id="password" value={password}
                        onChange={(e)=>setPassword(e.target.value)} placeholder="Masuukan Password" className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 border-[1.5px] px-2 py-3 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter" />


                        <label htmlFor="role" className="block text-sm mt-2 font-medium text-gray-700">Role</label>
                        <input type="text" id="role" value={role} onChange={(e)=> setRole(e.target.value)} placeholder="no_kerjasama" className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 border-[1.5px] px-2 py-3 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter" />
                        <button
              type="submit"
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500"
            >
              Tambah User
            </button>
                    </form>} />
        </>
    )
}
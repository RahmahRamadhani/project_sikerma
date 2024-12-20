'use client'

import { useState, useEffect } from 'react';
import Modal from "@/components/Modal/Modals";

export default function EditKerjasama({ kerjasama }: { kerjasama: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [nomorKerjasama, setNoKerjasama] = useState(kerjasama.nomor_kerjasama);
  const [judulKerjasama, setJudulKerjasama] = useState(kerjasama.judul_kerjasama);
  const [topikKerjasama, setTopikKerjasama] = useState(kerjasama.topik_kerjasama);
  const [tanggalMulai, setTanggalMulai] = useState(kerjasama.tanggal_mulai);
  const [tanggalAkhir, setTanggalAkhir] = useState(kerjasama.tanggal_akhir);
  const [status, setStatus] = useState(kerjasama.status);
  const [tipe, setTipe] = useState(kerjasama.tipe.nama_tipe);
  const [instansi, setInstansi] = useState(kerjasama.instansi.nama_instansi);
  

  const handleModal = () => setIsOpen(!isOpen);

  const handleSave = async () => {
    const updatedKerjasama = {
      nomor_kerjasama: nomorKerjasama,
      judul_kerjasama: judulKerjasama,
      topik_kerjasama: topikKerjasama,
      tanggal_mulai: tanggalMulai,
      tanggal_akhir: tanggalAkhir,
      status: status,
      tipe: tipe,
      instansi: instansi,
    };

    try {
      // Kirim data yang sudah diubah ke server (menggunakan PUT)
      const response = await fetch(`/api/kerjasama?id=${kerjasama.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedKerjasama),
      });

      const result = await response.json();
      if (response.ok) {
        // onSave(result.data);  // Memanggil callback untuk menyimpan perubahan
        alert(result.msg);
      } else {
        alert(result.msg);
      }
    } catch (err) {
      alert('Gagal memperbarui data kerjasama');
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
      <h2 className="text-xl text-orange-500 font-bold mb-4">Edit Data Kerjasama</h2>
        <label className="block  text-left mt-2 font-medium text-gray-700">Nomor Kerjasama</label>
        <input
          type="text"
          value={nomorKerjasama}
          onChange={(e) => setNoKerjasama(e.target.value)}
          className="w-full border rounded-md px-2 py-1"
        />

<label className="block text-left mt-2 font-medium text-gray-700">Tipe</label>
        <input
          type="text"
          value={tipe}
          onChange={(e) => setTipe(e.target.value)}
          className="w-full border rounded-md px-2 py-1"
        />
        <label className="block text-left mt-2 font-medium text-gray-700">Nama Instansi</label>
        <input
          type="text"
          value={instansi}
          onChange={(e) => setInstansi(e.target.value)}
          className="w-full border rounded-md px-2 py-1"
        />

        <label className="block text-left mt-2 font-medium text-gray-700">Judul</label>
        <input
          type="text"
          value={judulKerjasama}
          onChange={(e) => setJudulKerjasama(e.target.value)}
          className="w-full border rounded-md px-2 py-1"
        />

        <label className="block text-left mt-2 font-medium text-gray-700">Topik</label>
        <input
          type="text"
          value={topikKerjasama}
          onChange={(e) => setTopikKerjasama(e.target.value)}
          className="w-full border rounded-md px-2 py-1"
        />
        <label className="block text-left mt-2 font-medium text-gray-700">Tanggal Mulai</label>
        <input
          type="date"
          value={tanggalMulai}
          onChange={(e) => setTanggalMulai(e.target.value)}
          className="w-full border rounded-md px-2 py-1"
        
        />
        <label className="block text-left mt-2 font-medium text-gray-700">Tanggal Akhir</label>
        <input
          type="date"
          value={tanggalAkhir}
          onChange={(e) => setTanggalAkhir(e.target.value)}
          className="w-full border rounded-md px-2 py-1"
        />

        <label className="block  text-left mt-2 font-medium text-gray-700">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border rounded-md px-2 py-1"
        >
          
          <option value="" disabled>Pilih Role</option>
          <option value="Aktif">Aktif</option>
          <option value="Tidak Aktif">Tidak Aktif</option>
        </select>

        <button onClick={handleSave} className="bg-green-600 text-white px-4 py-2 rounded-md mt-4">
          Simpan
        </button> 
      </Modal>
    </>
  );
}

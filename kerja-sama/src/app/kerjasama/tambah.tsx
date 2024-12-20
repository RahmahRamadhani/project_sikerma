'use client'

import Modal from "@/components/Modal/Modals";
import { useEffect, useState } from "react";

export default function AddKerjasama() {
    const [isOpen, setIsOpen] = useState(false);
    const handleModal = () => setIsOpen(!isOpen);

    const [nomorKerjasama, setNoKerjasama] = useState('');
    const [judulKerjasama, setJudulKerjasama] = useState('');
    const [topikKerjasama, setTopikKerjasama] = useState('');
    const [tanggalMulai, setTanggalMulai] = useState('');
    const [tanggalAkhir, setTanggalAkhir] = useState('');
    const [status, setStatus] = useState('');
    const [tipe, setTipe] = useState('');
    const [instansi, setInstansi] = useState('');

    const [tipeOptions, setTipeOptions] = useState([]);
    const [instansiOptions, setInstansiOptions] = useState([]);

    // Fetch data untuk dropdown tipe dan instansi
    useEffect(() => {
        const fetchDropdownData = async () => {
            try {
                const tipeResponse = await fetch('/api/tipe');
                const instansiResponse = await fetch('/api/instansi');
                const tipeData = await tipeResponse.json();
                const instansiData = await instansiResponse.json();

                setTipeOptions(tipeData.data);
                setInstansiOptions(instansiData.data);
            } catch (error) {
                console.error('Error fetching dropdown data:', error);
            }
        };

        fetchDropdownData();
    }, []);

    // Fungsi untuk menangani form submission (menambahkan user)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Menghentikan form dari refresh otomatis

        const newKerjasama = {
            no_kerjasama: nomorKerjasama,
            judul_kerjasama: judulKerjasama,
            topik_kerjasama: topikKerjasama,
            tanggal_mulai: tanggalMulai,
            tanggal_akhir: tanggalAkhir,
            status: status,
            tipe: tipe,
            instansi: instansi
        };

        try {
            const response = await fetch('/api/kerjasama', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newKerjasama),
            });

            const result = await response.json();
            if (response.ok) {
                alert(result.msg);
                window.location.reload();// Menampilkan pesan sukses
                handleModal();
                // Menutup modal setelah sukses
                // Reset form
                setNoKerjasama('');
                setJudulKerjasama('');
                setTopikKerjasama('');
                setTanggalMulai('');
                setTanggalAkhir('');
                setStatus('');
                setTipe('');
                setInstansi('');
            } else {
                alert(result.msg); // Pesan error dari API
            }
        } catch (error) {
            console.error('Error menambahkan Data:', error);
            alert('Gagal menambahkan Data');
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
                        <div className="p-4">
                            <h2 className="text-xl text-orange-500 font-bold mb-4">Tambah Data Kerjasama</h2>
                            <div>
                                <label htmlFor="" className="block text-sm mt-2 font-medium text-gray-700">Nomor Kerjasama</label>
                                <input type="text" placeholder="Nomor Kerjasama" id="no_kerjasama" value={nomorKerjasama} onChange={(e) => setNoKerjasama(e.target.value)} className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 border-[1.5px] px-2 py-3 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter" />
                            </div>
                            <div>
                                <label htmlFor="" className="block text-sm font-medium text-gray-700 mt-2 ">Tipe Kerjasama</label>
                                <select value={tipe} onChange={(e) => setTipe(e.target.value)} className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 border-[1.5px] px-2 py-3 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter">
                                    <option value="" disabled>Pilih Tipe</option>
                                    {tipeOptions.map((option: any) => (
                                        <option key={option.id} value={option.id}>
                                            {option.nama_tipe}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="" className="block text-sm font-medium text-gray-700 mt-2">Nama Instansi</label>
                                <select value={instansi} onChange={(e) => setInstansi(e.target.value)} className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 border-[1.5px] px-2 py-3 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter">
                                    <option value="" disabled>Pilih Instansi</option>
                                    {instansiOptions.map((option: any) => (
                                        <option key={option.id} value={option.id}>
                                            {option.nama_instansi}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="" className="block text-sm font-medium text-gray-700 mt-2">Judul Kerjasama</label>
                                <input type="text" placeholder="Masukkan judul" id="judul_kerjasama" value={judulKerjasama} onChange={(e) => setJudulKerjasama(e.target.value)} className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 border-[1.5px] px-2 py-3 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter" />
                            </div>
                            <div>
                                <label htmlFor="" className="block text-sm font-medium text-gray-700 mt-2">Topik Kerjasama</label>
                                <input type="text" placeholder="Masukkan Topik" id="topik_kerjasama" value={topikKerjasama} onChange={(e) => setTopikKerjasama(e.target.value)} className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 border-[1.5px] px-2 py-3 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter" />
                            </div>
                            <div>
                                <label htmlFor="" className="block text-sm font-medium text-gray-700 mt-2">Tanggal Mulai</label>
                                <input type="date" id="tanggal_mulai" value={tanggalMulai} onChange={(e) => setTanggalMulai(e.target.value)} className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 border-[1.5px] px-2 py-3 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter" />
                            </div>
                            <div>
                                <label htmlFor="" className="block text-sm font-medium text-gray-700 mt-2">Tanggal Akhir</label>
                                <input type="date" id="tanggal_akhir" value={tanggalAkhir} onChange={(e) => setTanggalAkhir(e.target.value)} className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 border-[1.5px] px-2 py-3 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter" />
                            </div>
                            <div>
                                <label htmlFor="" className="block text-sm font-medium text-gray-700 mt-2">Status</label>
                                <select name="status" id="status" value={status} onChange={(e) => setStatus(e.target.value)} className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 border-[1.5px] px-2 py-3 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter">
                                    <option value="" disabled>Pilih Status</option>
                                    <option value="aktif">Aktif</option>
                                    <option value="tidak aktif">Tidak Aktif</option>
                                </select>
                            </div>
                            <div className="mt-4">
                                <button
                                    type="submit"
                                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600"
                                >
                                    Simpan
                                </button>
                            </div>

                        </div>


                    </form>
                }
            />
        </>
    )
}
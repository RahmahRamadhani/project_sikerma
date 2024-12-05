'use client'

import Modal from "@/components/Modal/Modals";
import { useState } from "react";

export default function AddKerjasama() {
    const [isOpen, setIsOpen] = useState(false);
    const handleModal = () => setIsOpen(!isOpen);
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
                    <>
                        <div className="p-4">
                            <h2 className="text-xl font-bold mb-4">Tambah Data Kerjasama</h2>
                            <div>
                                <label htmlFor="" className="block text-sm mt-2 font-medium text-gray-700">Nomor Kerjasama</label>
                                <input type="text" placeholder="no_kerjasama" className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 border-[1.5px] px-2 py-3 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter" />
                            </div>
                            <div>
                                <label htmlFor="" className="block text-sm font-medium text-gray-700 mt-2 ">Tipe Kerjasama</label>
                                <input type="text" placeholder="tipe" className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 border-[1.5px] px-2 py-3 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter" />
                            </div>
                            <div>
                                <label htmlFor="" className="block text-sm font-medium text-gray-700 mt-2">Nama Instansi</label>
                                <input type="text" placeholder="nama isntansi" className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 border-[1.5px] px-2 py-3 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter" />
                            </div>
                            <div>
                                <label htmlFor="" className="block text-sm font-medium text-gray-700 mt-2">Judul Kerjasama</label>
                                <input type="text" placeholder="judul" className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 border-[1.5px] px-2 py-3 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter" />
                            </div>
                            <div>
                                <label htmlFor="" className="block text-sm font-medium text-gray-700 mt-2">Topik Kerjasama</label>
                                <input type="text" placeholder="topik" className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 border-[1.5px] px-2 py-3 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter" />
                            </div>
                            <div>
                                <label htmlFor="" className="block text-sm font-medium text-gray-700 mt-2">Tanggal Mulai</label>
                                <input type="date" placeholder="topik" className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 border-[1.5px] px-2 py-3 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter" />
                            </div>
                            <div>
                                <label htmlFor="" className="block text-sm font-medium text-gray-700 mt-2">Tanggal Akhir</label>
                                <input type="date" placeholder="topik" className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 border-[1.5px] px-2 py-3 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter" />
                            </div>
                            <div>
                                <label htmlFor="" className="block text-sm font-medium text-gray-700 mt-2">Status</label>
                                <select name="status" id="" className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 border-[1.5px] px-2 py-3 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter">
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


                    </>
                }
            />
        </>
    )
}
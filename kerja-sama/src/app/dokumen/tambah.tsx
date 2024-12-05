'use client'

import Modal from "@/components/Modal/Modals";
import { useState } from "react";

export default function AddDokumen() {
    const [isOpen, setIsOpen] = useState(false);
    const handleModal = () => setIsOpen(!isOpen);
    return (
        <>
            <button onClick={handleModal} className="flex items-center bg-blue-600 text-white px-2 h-9 py-1 rounded-md hover:bg-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 25 25" stroke-width="1.5" stroke="currentColor" className="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                Tambah</button>
            <Modal isOpen={isOpen} onClose={handleModal} children={
                <div className="p-4">
                    <h2 className="text-xl font-bold mb-4">Tambah Data Dokumen</h2>
                </div>
            }

            />
        </>
    )
}
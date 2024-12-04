'use client'

import Modal from "@/components/Modal/Modals";
import { useState } from "react";

export default function AddKerjasama(){
const [isOpen, setIsOpen] = useState(false);
const handleModal = ()=>setIsOpen(!isOpen);
    return (
        <>
        <button onClick={handleModal} className="bg-blue-600 text-white px-5 h-9 py-1 rounded-md hover:bg-blue-500">tambah</button>
        <Modal
        isOpen={isOpen}
        onClose={handleModal}
    children={
        <>
        <div>
            <label htmlFor="">nama</label>
            <input type="text" placeholder="nama" />

        </div>
        
        </>
    }
        />
        </>
    )
}
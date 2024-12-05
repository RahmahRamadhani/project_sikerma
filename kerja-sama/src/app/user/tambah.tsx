'use client'

import Modal from "@/components/Modal/Modals";
import { useState } from "react";

export default function AddUser() {
    const [isOpen, setIsOpen] = useState(false);
    const handleModal = () => setIsOpen(!isOpen);
    return (
        <>
            <button onClick={handleModal} className="bg-blue-600 text-white px-5 h-9 py-1 rounded-md hover:bg-blue-500">tambah</button>
<Modal 
isOpen={isOpen}
onClose={handleModal}
children={
    <>
    <label htmlFor="" className="block text-sm mt-2 font-medium text-gray-700">Nomor Kerjasama</label>
                                <input type="text" placeholder="no_kerjasama" className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 border-[1.5px] px-2 py-3 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter" />
          
    </>}/>
        </>
    )
}
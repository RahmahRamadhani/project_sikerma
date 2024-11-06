import { useEffect, useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Memanggil API dari backend saat komponen pertama kali dimuat
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/`) // Menggunakan URL dari .env.local
      .then((response) => response.text()) // Mengambil respon sebagai teks
      .then((data) => setMessage(data)) // Menyimpan data ke state
      .catch((error) => console.error('Error:', error)); // Menangani error
  }, []); // Array kosong untuk menjalankan useEffect hanya sekali saat komponen dimuat

  return <div>Pesan dari backend: {message}</div>; // Menampilkan pesan dari backend
}

-- CreateEnum
CREATE TYPE "roleUser" AS ENUM ('admin', 'staff', 'mitra');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "nama_user" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "roleUser" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TipeKerjasama" (
    "id" SERIAL NOT NULL,
    "nama_tipe" TEXT NOT NULL,
    "deskripsi" TEXT,

    CONSTRAINT "TipeKerjasama_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kerjasama" (
    "id" SERIAL NOT NULL,
    "nomor_kerjasama" TEXT NOT NULL,
    "judul_kerjasama" TEXT NOT NULL,
    "topik_kerjasama" TEXT NOT NULL,
    "tanggal_mulai" TIMESTAMP(3) NOT NULL,
    "tanggal_akhir" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "id_tipe" INTEGER NOT NULL,
    "id_instansi" INTEGER NOT NULL,

    CONSTRAINT "Kerjasama_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Instansi" (
    "id" SERIAL NOT NULL,
    "nama_instansi" TEXT NOT NULL,
    "bidang_usaha" TEXT NOT NULL,
    "provinsi" TEXT NOT NULL,
    "kota" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "telepon" TEXT,
    "email" TEXT NOT NULL,

    CONSTRAINT "Instansi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DokumenKerjasama" (
    "id" SERIAL NOT NULL,
    "id_kerjasama" INTEGER NOT NULL,
    "nama_dokumen" TEXT NOT NULL,
    "path_file" TEXT NOT NULL,
    "tanggal_upload" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "keterangan" TEXT NOT NULL,

    CONSTRAINT "DokumenKerjasama_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notifikasi" (
    "id" SERIAL NOT NULL,
    "id_user" INTEGER NOT NULL,
    "pesan" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'unread',
    "tanggal_kirim" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notifikasi_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Instansi_email_key" ON "Instansi"("email");

-- AddForeignKey
ALTER TABLE "Kerjasama" ADD CONSTRAINT "Kerjasama_id_tipe_fkey" FOREIGN KEY ("id_tipe") REFERENCES "TipeKerjasama"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kerjasama" ADD CONSTRAINT "Kerjasama_id_instansi_fkey" FOREIGN KEY ("id_instansi") REFERENCES "Instansi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DokumenKerjasama" ADD CONSTRAINT "DokumenKerjasama_id_kerjasama_fkey" FOREIGN KEY ("id_kerjasama") REFERENCES "Kerjasama"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notifikasi" ADD CONSTRAINT "Notifikasi_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

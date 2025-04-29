-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'KEPSEK');

-- CreateEnum
CREATE TYPE "SifatSurat" AS ENUM ('SangatSegera', 'Segera', 'Biasa');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'ADMIN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SuratMasuk" (
    "id" SERIAL NOT NULL,
    "noSurat" TEXT NOT NULL,
    "perihal" TEXT NOT NULL,
    "alamatPengirim" TEXT NOT NULL,
    "tanggalTerima" TEXT NOT NULL,
    "sifatSurat" "SifatSurat" NOT NULL,
    "fileUrl" TEXT,
    "disposisi" TEXT,
    "isiDisposisi" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SuratMasuk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SuratKeluar" (
    "id" SERIAL NOT NULL,
    "noSurat" TEXT NOT NULL,
    "noBerkas" TEXT NOT NULL,
    "alamatPenerima" TEXT NOT NULL,
    "tanggalKeluar" TEXT NOT NULL,
    "perihal" TEXT NOT NULL,
    "noPetunjuk" TEXT NOT NULL,
    "noPaket" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SuratKeluar_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

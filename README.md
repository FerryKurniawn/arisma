# 🧩 Fullstack Express App (Backend + Frontend)

Selamat datang di repository Arisma! 🎉  
Arisma adalah sistem untuk mengelola surat masuk dan surat keluar di man 1 sintang
Project ini terdiri dari dua bagian utama:

- **`backend/`** – API server menggunakan Express.js
- **`frontend/`** – Frontend menggunakan react js

## Requirement

Wajib install postgresql, dll tergantung ingin menggunakan apa

## 📦 Clone & Instalasi

```bash
# Clone repositori
git clone https://github.com/username/namaproject.git
cd namaproject

# Install dependensi di folder backend
cd backend
npm install
lalu buat file .env di root
lalu isi dengan yang ada di seperti .env.development dan disesuaikan dengan database kalian
lalu diterimal npx prisma generate / npx prisma db push
lalu jalankan backendnya dengan node .


# Install dependensi di folder frontend
cd ../frontend
npm install
lalu jalankan dengan npm run dev

# Penggunaan sistem
buat user di postman dengan method post ke route http://localhost:2000/api/register dan body json nya
{
    "username": "yourusername",
    "password": "yourpass",
    "role": "ADMIN/KEPSEK"
}
```

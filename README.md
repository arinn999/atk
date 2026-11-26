# ✏️ PenaKita - Web Toko Alat Tulis Sederhana

Aplikasi web e-commerce toko alat tulis sederhana yang dibangun menggunakan **HTML5**, **CSS3**, dan **Vanilla JavaScript** tanpa framework tambahan.

## ✨ Fitur Utama
- **Katalog Produk & Harga**: Menampilkan daftar alat tulis lengkap beserta deskripsi dan harga dalam format Rupiah.
- **Pencarian Real-time**: Memfilter produk secara langsung berdasarkan kata kunci.
- **Sistem Login & Logout**: Autentikasi pengguna berbasis `localStorage` sehingga sesi tetap aktif meski halaman di-refresh.
- **Keranjang Belanja (Shopping Cart)**:
  - Menambah produk ke keranjang.
  - Mengubah jumlah barang (`+` / `-`) atau menghapus barang.
  - Kalkulasi total harga otomatis.
- **Checkout & Struk Pembelian**: Validasi status login sebelum transaksi dan menampilkan ringkasan struk pembelian.

## 📂 Struktur File
- `index.html` — Struktur utama halaman web dan modal (Login, Keranjang, Struk).
- `style.css` — Desain antarmuka responsif dan styling komponen.
- `script.js` — Logika produk, keranjang belanja, autentikasi, dan penyimpanan `localStorage`.
- `README.md` — Dokumentasi proyek.

## 🚀 Cara Menjalankan
1. Unduh atau salin semua file ke dalam satu folder yang sama.
2. Klik dua kali file `index.html` untuk membukanya di browser (Chrome, Edge, Firefox, dll).
3. Login menggunakan username bebas (password minimal 4 karakter) untuk melakukan transaksi pembelian.

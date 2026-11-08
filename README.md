# BukuKita – Katalog Buku

BukuKita adalah aplikasi katalog buku berbasis web yang dibuat menggunakan React dan TypeScript. Aplikasi ini memungkinkan pengguna mencari buku, melihat detail buku, menyimpan buku favorit, serta membuat catatan atau ulasan singkat.

## Fitur Aplikasi

- Menampilkan daftar buku dari Open Library API.
- Mencari buku berdasarkan judul atau kata kunci.
- Mengurutkan buku berdasarkan judul A–Z dan Z–A.
- Memfilter buku berdasarkan kategori.
- Pagination untuk menampilkan halaman buku.
- Melihat detail informasi buku.
- Menyimpan dan menghapus buku favorit.
- Membuat catatan atau ulasan buku dengan validasi form.
- Menampilkan status loading, error, dan data kosong.

## Teknologi yang Digunakan

- React
- TypeScript
- Vite
- React Router DOM
- Context API
- Lucide React
- Open Library API
- CSS

## Penjelasan Implementasi

### 1. Routing

Aplikasi menggunakan React Router DOM untuk mengatur perpindahan halaman tanpa melakukan reload seluruh halaman (*client-side routing*).

Beberapa route yang digunakan:

- `/` untuk halaman katalog buku.
- `/buku/:id` untuk halaman detail buku berdasarkan ID.
- `/favorit` untuk halaman buku favorit.
- `/catatan` untuk halaman catatan buku.

Nested routing diterapkan melalui `MainLayout` dengan komponen `Outlet`.

### 2. State Management

Pengelolaan state menggunakan beberapa pendekatan:

- **Local State:** `useState` digunakan untuk mengelola pencarian, kategori, pengurutan, dan data formulir catatan.
- **Global State:** Context API melalui `FavoriteContext` digunakan untuk mengelola daftar buku favorit agar dapat diakses dari berbagai halaman.
- **Server State:** Data buku dari API dikelola melalui custom hook `useBooks`.
- **URL State:** `useSearchParams` digunakan untuk menyimpan kata kunci pencarian dan nomor halaman pada URL.
- **Form State:** Input judul dan isi catatan dikelola menggunakan controlled component dan validasi form.

Data buku favorit juga disimpan menggunakan `localStorage` agar tetap tersedia setelah halaman dimuat ulang.

### 3. API Integration

Aplikasi menggunakan Open Library API untuk mengambil data buku.

Proses pengambilan data dipisahkan ke dalam file `bookService.ts`, yang memiliki fungsi:

- `getBooks()` untuk mengambil daftar buku.
- `getBookDetail()` untuk mengambil detail buku.
- `getCoverUrl()` untuk mendapatkan URL sampul buku.

Aplikasi juga menyediakan tampilan loading, error, dan empty state ketika mengambil atau menampilkan data.

### 4. Custom Hooks

Custom hook yang digunakan adalah `useBooks` dan `useFavorites`.

- `useBooks` digunakan untuk mengambil data buku dari API serta mengelola loading, error, dan jumlah data.
- `useFavorites` digunakan untuk mengakses fungsi dan data buku favorit dari `FavoriteContext`.

### 5. Struktur Folder

```text
src/
├── components/
│   ├── BookCard.tsx
│   ├── SearchBar.tsx
│   ├── StatusMessage.tsx
│   ├── Pagination.tsx
│   └── PageHeading.tsx
├── context/
│   └── FavoriteContext.tsx
├── hooks/
│   └── useBooks.ts
├── layouts/
│   └── MainLayout.tsx
├── pages/
│   ├── HomePage.tsx
│   ├── DetailPage.tsx
│   ├── FavoritePage.tsx
│   └── NotesPage.tsx
├── services/
│   └── bookService.ts
├── App.tsx
├── index.css
└── main.tsx
```

Setiap folder memiliki tanggung jawab masing-masing. Folder `components` menyimpan komponen yang dapat digunakan kembali, `pages` menyimpan halaman aplikasi, `services` mengatur komunikasi dengan API, `hooks` menyimpan custom hooks, dan `context` mengelola global state.

## Sumber API

Data buku diperoleh dari Open Library API:

https://openlibrary.org/developers/api

## Cara Menjalankan Aplikasi

1. Clone repository ini.
2. Masuk ke folder proyek.
3. Install dependencies:

   ```bash
   npm install
   ```

4. Jalankan aplikasi:

   ```bash
   npm run dev
   ```

5. Buka alamat lokal yang ditampilkan oleh Vite di browser.

## Build Production

Untuk membuat hasil build production, jalankan:

```bash
npm run build
```

## Pengembang

Dibuat untuk memenuhi Tugas Pertemuan 8 mata kuliah Pengembangan Aplikasi Web (PAW).
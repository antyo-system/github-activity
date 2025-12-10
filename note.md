1️⃣ Full Capslock (CONSTANT_CASE) itu hanya dipakai untuk nilai tetap global

Di Task Tracker kemarin kamu punya:

const TASKS_FILE = path.join(process.cwd(), "tasks.json");


Ini full capslock karena:

Nilainya nggak akan pernah berubah selama program jalan.

Digunakan di banyak bagian (global constant).

Itu mewakili config atau lokasi file tetap.

🧩 Jadi “capslock” itu cuma gaya penulisan (naming convention) untuk menunjukkan:

“Hey, ini konstanta global — nilainya tetap dan bersifat konfigurasi.”

🧠 2️⃣ Di github-activity.js, semua variabel bersifat lokal/dinamis

Perhatikan variabel-variabel di sini:

const https = require("https");
const username = process.argv[2];
const url = `https://api.github.com/users/${username}/events`;


https = modul, bukan konstanta konfigurasi.

username = diisi setiap kali user input argumen baru, jadi bisa berubah.

url = juga tergantung username, jadi dinamis.

Karena itu nggak cocok dijadikan ALL_CAPS, karena nilainya bukan sesuatu yang “konstan selamanya.”

🧩 3️⃣ Pola praktis (bisa kamu hafalin):
Tipe Variabel	Contoh	Gaya Penulisan	Kenapa
Global constant (config, path, API key)	TASKS_FILE, API_URL, DEFAULT_LIMIT	ALL_CAPS	Nilainya tetap, bisa dibaca di seluruh kode
Module import	const fs = require("fs")	camelCase	Nama pendek sesuai module
Dinamis / hasil proses	username, data, events, url	camelCase	Nilainya berubah, konteks lokal
💡 Jadi dalam GitHub Activity CLI:

Kamu tidak butuh constant global, karena semua proses terjadi “sekali jalan” berdasarkan argumen.

Kalau kamu tambahin semacam:

const BASE_URL = "https://api.github.com";


baru itu layak ditulis full caps:

const BASE_URL = "https://api.github.com";
const ENDPOINT = `${BASE_URL}/users/${username}/events`;

✨ Kesimpulan:

Kamu pakai ALL_CAPS hanya untuk nilai tetap & global (konfigurasi),
bukan untuk hal yang berubah per-execution atau per-user input.
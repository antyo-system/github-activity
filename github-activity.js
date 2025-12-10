// Import module bawaan Node.js
const https = require("https");

// Ambil username dari argumen CLI
const username = process.argv[2]; // node github-activity.js <username>
// Cek kalau username ada
if (!username) {
  // Kalau gak ada, tampilkan pesan error dan keluar
  console.error("Usage: node github-activity.js <username>"); // Pesan error
  process.exit(1);
}

// Buat URL untuk GitHub API
const url = `https://api.github.com/users/${username}/events`; // Endpoint untuk aktivitas user

// Fetch data dari API pakai https.get()  //fetch artinya mengambil data dari suatu tempat, dalam programing (khususnya web development) fetch biasanya merujuk pada proses mengambil data dari server atau API (Application Programming Interface) menggunakan protokol HTTP atau HTTPS. Data yang diambil bisa berupa berbagai format seperti JSON, XML, HTML, atau file lainnya. Proses fetch ini sering dilakukan menggunakan metode seperti GET atau POST untuk berkomunikasi dengan server dan mendapatkan data yang dibutuhkan oleh aplikasi atau website.
// contoh manusiawi: kamu mau ambil data dari GitHub API.
//maka kamu "fetch"data-nya -seperti kamu pergi ke perpustakaan untuk "fetch" buku yang kamu butuhkan.
//fetch(""https://api.github.com/users/antyo-system")
//.then(response => response.json())
//.then(data => console.log(data))
//.catch(error => console.error('Error fetching data:', error));
https // Module https bawaan Node.js
  .get(
    // Lakukan GET request ke
    url, // URL API GitHub
    { headers: { "User-Agent": "node.js" } }, // wajib untuk GitHub API agar gak ditolak requestnya
    (res) => {
      // Callback untuk response
      let data = ""; // Variabel untuk menampung data yang diterima

      // Kumpulkan data dari stream
      res.on("data", (chunk) => {
        // Setiap kali ada data baru
        data += chunk; // Tambahkan ke variabel data
      }); // Selesai menerima data

      // Setelah data selesai dikirim
      res.on("end", () => {
        // Jika response gagal
        if (res.statusCode !== 200) {
          console.error(`Error: ${res.statusCode} ${res.statusMessage}`);
          process.exit(1);
        }

        try {
          // Parse data JSON dari API
          const events = JSON.parse(data);

          if (events.length === 0) {
            console.log("No recent activity found.");
            return;
          }

          // Tampilkan 10 aktivitas terbaru
          events.slice(0, 10).forEach((event) => {
            // Warna terminal (pakai ANSI escape code)
            const color = {
              reset: "\x1b[0m",
              blue: "\x1b[34m",
              green: "\x1b[32m",
              yellow: "\x1b[33m",
              magenta: "\x1b[35m",
              cyan: "\x1b[36m",
              red: "\x1b[31m",
              bold: "\x1b[1m",
            };

            // Tampilkan aktivitas
            events.slice(0, 10).forEach((event) => {
              const repo = `${color.cyan}${event.repo.name}${color.reset}`;
              switch (event.type) {
                case "CreateEvent":
                  console.log(
                    `🆕 ${color.green}Created${color.reset} repository: ${repo}`
                  );
                  break;

                case "PushEvent":
                  const commits = event.payload?.commits?.length || 0;
                  console.log(
                    `🧑‍💻 ${color.blue}Pushed${color.reset} ${commits} commits to ${repo}`
                  );
                  break;

                case "IssuesEvent":
                  console.log(
                    `🐞 ${color.yellow}Issue ${event.payload.action}${color.reset} in ${repo}`
                  );
                  break;

                case "WatchEvent":
                  console.log(
                    `⭐ ${color.magenta}Starred${color.reset} ${repo}`
                  );
                  break;

                case "PullRequestEvent":
                  console.log(
                    `🔀 ${color.green}Pull Request ${event.payload.action}${color.reset} in ${repo}`
                  );
                  break;

                default:
                  console.log(
                    `📦 ${color.bold}${event.type}${color.reset} on ${repo}`
                  );
              }
            });
          });
        } catch (err) {
          console.error("Error parsing JSON:", err.message);
        }
      });
    }
  )
  // Kalau ada error koneksi / request
  .on("error", (err) => {
    console.error("Request failed:", err.message);
  });

# Dampak Multimedia dalam Industri

Presentasi interaktif berbasis web untuk Proyek UTS Multimedia (IF562528), Universitas PGRI Ronggolawe Tuban. Opsi 1: Presentasi Interaktif.

**Nama:** [Nama Lengkap] | **NIM:** [NIM]
**Live:** [URL GitHub Pages/Vercel]

## Deskripsi
Presentasi 14 slide yang membahas dampak multimedia pada tiga industri: Healthcare, Education, dan Entertainment. Dibuat dengan HTML, CSS, dan JavaScript murni tanpa framework, sehingga ringan dan mudah dipelajari. Setiap industri dilengkapi studi kasus nyata, gambar, dan elemen interaktif.

## Topik yang dibahas
1. Pengantar multimedia dan tujuan presentasi
2. Healthcare: ikhtisar, studi kasus, dan titik interaktif pada tubuh manusia
3. Education: ikhtisar, studi kasus, dan kuis mini
4. Entertainment: ikhtisar dan studi kasus dengan tab dan video
5. Perbandingan tiga industri, tren ke depan, kesimpulan, dan referensi

## Cara membuka / menjalankan
- **Lokal (paling mudah):** unduh repo lalu buka `index.html` di browser.
- **Opsional:** jalankan lewat ekstensi Live Server di VS Code agar perilakunya sama seperti saat online.
- **Online:** buka link live di atas.
- **Navigasi:** tombol panah di layar, keyboard (← →, Home, End), atau geser di layar sentuh.

## Fitur
- Empat elemen interaktif: titik hotspot tubuh (slide 5), kuis 4 soal dengan skor (slide 8), tab studi kasus dengan pemutar video (slide 10), dan toggle perbandingan dampak positif dan tantangan (slide 11)
- Tata letak berbeda di tiap slide: split, bento grid, baris, tab, dan kolom blok warna
- Animasi masuk berurutan, transisi antar slide, progress bar, dan efek hover
- Video lokal MP4 dengan pemuatan hemat data (hanya metadata sebelum diputar)
- Responsif untuk ponsel, tablet, dan desktop
- Aksesibilitas: navigasi keyboard, `alt` text pada gambar, label ARIA, dan dukungan *prefers-reduced-motion*

## Tools
VS Code, Git dan GitHub, GitHub Pages, Color Hunt (palet), Google Fonts (Plus Jakarta Sans), Lighthouse dan WAVE (pengujian).

## Design decisions
- Palet empat warna dari Color Hunt: `#071B2B` (latar), `#167D8D` (aksen), `#B9E4E8` (judul), `#EEEEEE` (teks).
- Satu keluarga font, yaitu Plus Jakarta Sans, untuk menjaga konsistensi.
- Tata letak dibuat bervariasi agar presentasi tidak monoton, sementara warna dan tipografi tetap seragam.
- Navigasi slide ditulis sendiri tanpa library presentasi, agar ukuran kecil dan perilakunya bisa dikendalikan.
- Video tidak dimuat penuh di awal untuk menjaga waktu muat halaman.

## Challenges & solutions
> Sesuaikan dengan pengalamanmu sendiri.
- **Layout panel video terlalu kosong dan teks menumpuk di bawah.** Solusi: panel dibagi menjadi dua kolom dengan CSS Grid, video di kiri dan keterangan di kanan, lalu kembali satu kolom di layar kecil.
- **Video YouTube tidak bisa diputar saat halaman dibuka langsung dari folder (`file://`).** Solusi: memakai video MP4 lokal yang bisa diputar langsung dari folder proyek.
- **Ukuran file video bisa memperlambat situs.** Solusi: video dibuat 720p berformat MP4 (H.264) dan dimuat hanya saat dibutuhkan.
- [Tambahkan tantangan lain yang kamu alami]

## Struktur folder
```
index.html     struktur 14 slide
style.css      tampilan, animasi, dan efek hover
script.js      navigasi, hotspot, kuis, tab video, toggle
images/        gambar slide
video/         video studi kasus (netflix.mp4, game.mp4, film.mp4)
screenshots/   tangkapan layar untuk dokumentasi
```

## Screenshot
Simpan di folder `screenshots/` lalu tautkan di sini (minimal 5-10, termasuk tampilan ponsel).

| Slide | Gambar |
|-------|--------|
| Judul | ![](screenshots/01-judul.png) |
| [Slide lain] | ![](screenshots/[nama].png) |

## Referensi
1. World Health Organization. (2021). *Global strategy on digital health 2020–2025*. Geneva: WHO. https://www.who.int/publications/i/item/9789240020924. Diakses 9 November 2026.
2. World Health Organization. (2025, 23 Mei). *World Health Assembly endorses extension of the global digital health strategy to 2027*. https://www.who.int/news/item/23-05-2025-world-health-assembly-endorses-extension-of-the-global-digital-health-strategy-to-2027. Diakses 9 November 2026.
3. Laver, K. E., Lange, B., George, S., Deutsch, J. E., Saposnik, G., Chapman, M., & Crotty, M. (2025). Virtual reality for stroke rehabilitation. *Cochrane Database of Systematic Reviews*, Issue 6, CD008349. https://doi.org/10.1002/14651858.CD008349.pub5. Diakses 9 November 2026.
4. UNESCO, Global Education Monitoring Report Team. (2023). *Global Education Monitoring Report 2023: Technology in education, a tool on whose terms?* Paris: UNESCO. https://iite.unesco.org/news/global-education-monitoring-report-2023-technology-in-education-a-tool-on-whose-terms. Diakses 9 November 2026.
5. Netflix Technology Blog. (2026, Agustus). *MAPS: Netflix's multimodal asset personalization at scale*. https://netflixtechblog.com/maps-netflixs-multimodal-asset-personalization-at-scale-32f96320785e. Diakses 9 November 2026.

## Atribusi gambar
| File | Fotografer/pembuat | Sumber | Lisensi |
|------|--------------------|--------|---------|
| images/[nama].webp | [nama] | [Unsplash/Pexels/press kit] | [lisensi] |

## Atribusi video
| File | Judul video | Pembuat/kanal | Tahun | Sumber/URL |
|------|-------------|---------------|-------|------------|
| video/netflix.mp4 | [judul] | [kanal] | [tahun] | [URL] |
| video/game.mp4 | [judul] | [kanal] | [tahun] | [URL] |
| video/film.mp4 | [judul] | [kanal] | [tahun] | [URL] |

## Catatan
Seluruh kode ditulis dan dimodifikasi untuk keperluan tugas ini. Logo, gambar, dan video milik pihak ketiga digunakan untuk keperluan edukasi dengan atribusi sumber di atas.

# KELOMPOK KEBON KOPI
## Digital Information & Management System (KK-DMS)

Sistem Informasi dan Manajemen Digital resmi untuk organisasi **Kelompok Kebon Kopi**. Dibangun sebagai pusat administrasi, pengelolaan absensi pengajian rutin, monitoring hasil musyawarah, serta koordinasi tugas Penerobos berbasis cloud yang amanah, profesional, dan berkelanjutan.

---

### Identitas Desain Visual
- **Konsep**: *Modern Islamic Community Management System*
- **Palet Warna**:
  - Forest Green: `#174A35` (Primer, Topbar, Header Navigasi)
  - Olive Green: `#668C55` (Aksen, Badge status, Grafik)
  - Soft Beige: `#F2EBDD` (Aksen lembut, Kartu sorotan)
  - White: `#FFFFFF` (Permukaan kartu, form, tabel)
  - Dark Text: `#26352C` (Tipografi utama)
  - Light Canvas: `#F7F9F6` (Latar belakang aplikasi)
- **Tipografi**: `Plus Jakarta Sans` (Heading) & `Inter` (Data tables & body text)
- **Format Tanggal**: `DD/MM/YYYY` dengan zona waktu **Asia/Jakarta (WIB)**

---

### Struktur Menu Aplikasi

#### 1. Website Publik (Tanpa Autentikasi)
- **Beranda**: Hero banner, sambutan pengurus, cuplikan kegiatan terdekat, dokumentasi pilihan, tombol login pengurus.
- **Profil Kelompok**: Sejarah, visi & misi, struktur kepengurusan.
- **Informasi Kegiatan**: Jadwal pengajian (2–4 kali per pekan), musyawarah, dan kajian tematik.
- **Galeri Kegiatan**: Arsip foto kegiatan dengan filter kategori & pratinjau lightbox.
- **Hubungi Kami**: Layanan komunikasi WhatsApp, alamat sekretariat, dan formulir masukan jamaah.

#### 2. Dashboard Administrasi (Terproteksi RBAC)
- **Dashboard Overview**: 8 kartu ringkasan metrik, grafik kehadiran pengajian Recharts, grafik progres musyawarah, aksi cepat, dan log aktivitas audit.
- **Data Jamaah**: Database minimalis terfokus pada Nama & Jenis Kelamin (Laki-laki / Perempuan) dengan wizard import Excel 9-tahap aman (deteksi potensi duplikasi & pratinjau sebelum simpan).
- **Absensi Pengajian**: Penjadwalan fleksibel, lembar input kehadiran interaktif, tombol "Tandai Semua Hadir", rekapitulasi persentase kehadiran:
  $$\text{Persentase} = \frac{\text{Jumlah Hadir}}{\text{Total Kegiatan yang Diikuti}} \times 100\%$$
- **Jobdesk Penerobos**: Pelacakan pembagian peran, status pekerjaan, catatan evaluasi berkala, dan dokumen pendukung.
- **Hasil Musyawarah**: Monitoring ketercapaian program aktif, target penyelesaian, progress slider, dan riwayat perkembangan.
- **Laporan & Statistik**: Generator laporan berkala Excel (.xlsx) dan PDF siap cetak dengan kop resmi organisasi.
- **Arsip & Dokumen**: Penyimpanan dokumen internal dan media foto publik berbasis Cloud Storage.
- **Pengaturan**: Konfigurasi profil organisasi, hak akses pengguna (Super Admin, Admin, Pengurus), audit aktivitas, dan informasi backup database Firestore.

---

### Cara Menjalankan Aplikasi

#### Menjalankan Server Pengembangan (Dev Mode):
Klik dua kali file:
```bash
run-dev.bat
```
Atau jalankan via terminal:
```powershell
.\run-dev.bat
```
Website dapat diakses secara lokal melalui browser di `http://localhost:3000`.

#### Melakukan Build Produksi:
Klik dua kali file:
```bash
run-build.bat
```
Hasil build produksi siap deploy akan berada di folder `dist/`.

---

### Catatan Penting Pengelolaan Data Secara Bertahap
1. **Integritas Database**: Cloud Firestore adalah database permanen. Data tetap aman saat browser ditutup, berganti perangkat (HP/Laptop), maupun saat aplikasi diperbarui.
2. **Fleksibilitas Data**: Seluruh modul dirancang untuk menerima penambahan data baru kapan saja melalui dashboard tanpa perlu mengubah kode sumber website.

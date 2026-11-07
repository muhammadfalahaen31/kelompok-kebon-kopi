import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  ArrowRight, 
  Users, 
  CheckCircle2, 
  ShieldCheck, 
  BookOpen, 
  Image as ImageIcon,
  HeartHandshake,
  Sparkles
} from 'lucide-react';

export const BerandaPage: React.FC = () => {
  const upcomingEvents = [
    {
      id: '1',
      title: 'Pengajian Rutin Pekanan Jamaah',
      date: '10/11/2026',
      time: '19:30 - 21:00 WIB',
      location: 'Masjid / Sekretariat Kelompok Kebon Kopi',
      category: 'Pengajian',
      description: 'Kajian rutin pendalaman Al-Qur\'an dan Hadits serta silaturahim jamaah.',
    },
    {
      id: '2',
      title: 'Musyawarah Koordinasi Program Bulanan',
      date: '15/11/2026',
      time: '09:00 - 11:30 WIB',
      location: 'Ruang Musyawarah Kebon Kopi',
      category: 'Musyawarah',
      description: 'Evaluasi target kerja Penerobos dan monitoring ketercapaian program kelompok.',
    },
    {
      id: '3',
      title: 'Kajian Khusus Tematik & Silaturahim',
      date: '18/11/2026',
      time: '19:30 - 21:00 WIB',
      location: 'Sekretariat Kelompok Kebon Kopi',
      category: 'Pengajian',
      description: 'Penguatan kebersamaan jamaah dan pembinaan generasi muda.',
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-forest-50 via-canvas to-canvas pt-12 sm:pt-20 pb-12">
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-olive-100/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-80 h-80 bg-beige/40 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-olive-50 border border-olive-200/60 text-forest text-xs font-semibold">
                <Sparkles className="w-4 h-4 text-olive" />
                <span>KK-DMS • Digital Information & Management System</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-forest tracking-tight leading-[1.15]">
                Membangun Komunitas Jamaah yang <span className="text-olive">Teratur</span> & <span className="text-olive-dark">Amanah</span>
              </h1>

              <p className="text-base sm:text-lg text-ink-muted max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Selamat datang di portal resmi <strong>Kelompok Kebon Kopi</strong>. Sistem informasi terpadu untuk pengarsipan kegiatan, monitoring program, absensi pengajian, dan transparansi musyawarah kelompok.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
                <Link
                  to="/kegiatan"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white bg-forest hover:bg-forest-light shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
                >
                  <Calendar className="w-5 h-5 text-olive-light" />
                  <span>Jadwal & Kegiatan</span>
                </Link>

                <Link
                  to="/profil"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-forest bg-white border border-gray-200 hover:bg-gray-50 shadow-xs transition-all hover:-translate-y-0.5"
                >
                  <span>Profil Kelompok</span>
                  <ArrowRight className="w-4 h-4 text-olive" />
                </Link>
              </div>

              {/* Key Trust Metrics */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200/80 max-w-lg mx-auto lg:mx-0">
                <div>
                  <p className="text-2xl font-heading font-bold text-forest">2-4x</p>
                  <p className="text-xs text-ink-subtle">Pengajian / Pekan</p>
                </div>
                <div>
                  <p className="text-2xl font-heading font-bold text-forest">100%</p>
                  <p className="text-xs text-ink-subtle">Digital & Terpusat</p>
                </div>
                <div>
                  <p className="text-2xl font-heading font-bold text-forest">Amanah</p>
                  <p className="text-xs text-ink-subtle">Transparansi Data</p>
                </div>
              </div>
            </div>

            {/* Right Hero Graphic Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100 relative">
                <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
                  <img 
                    src="/logo-placeholder.svg" 
                    alt="Logo Kelompok Kebon Kopi" 
                    className="w-16 h-16 object-contain bg-canvas rounded-full p-2 border border-olive-100"
                  />
                  <div>
                    <h3 className="font-heading font-bold text-lg text-forest">Kelompok Kebon Kopi</h3>
                    <p className="text-xs text-olive-dark font-medium">Digital Management System</p>
                    <span className="inline-block mt-1 text-[11px] text-ink-subtle">Zona Waktu: Asia/Jakarta (WIB)</span>
                  </div>
                </div>

                <div className="space-y-4 pt-6">
                  <div className="p-3.5 rounded-xl bg-beige-light border border-beige-dark/30 flex items-start gap-3">
                    <BookOpen className="w-5 h-5 text-forest mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-forest">Absensi & Riwayat Pengajian</p>
                      <p className="text-[11px] text-ink-muted">Pencatatan tertib kehadiran jamaah dengan rekapitulasi berkala.</p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-olive-50 border border-olive-100 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-olive-dark mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-forest">Monitoring Musyawarah</p>
                      <p className="text-[11px] text-ink-muted">Pelacakan progres target program kerja hingga tuntas.</p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100 flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-forest mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-forest">Jobdesk Penerobos</p>
                      <p className="text-[11px] text-ink-muted">Pembagian tugas dan tanggung jawab terstruktur.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 text-center">
                  <Link
                    to="/login"
                    className="inline-flex items-center gap-2 text-xs font-bold text-forest hover:text-olive-dark transition-colors"
                  >
                    <span>Masuk ke Dashboard Administrasi</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Sambutan & Deskripsi Singkat */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-8 sm:p-12 border border-gray-100 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-4 text-center lg:text-left space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-olive">Sambutan Pengurus</span>
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-forest">
                Kebersamaan dalam Nilai & Ketertiban Administrasi
              </h2>
              <div className="w-16 h-1 bg-olive rounded-full mx-auto lg:mx-0" />
            </div>

            <div className="lg:col-span-8 space-y-4 text-ink-muted text-sm sm:text-base leading-relaxed">
              <p>
                Kelompok Kebon Kopi senantiasa berkomitmen untuk memelihara kerukunan, ketertiban pengajian, dan kekompakan seluruh jamaah. Di era keterbukaan informasi ini, sistem digital KK-DMS hadir untuk mempermudah tata kelola data, pelaporan hasil musyawarah, dan dokumentasi kegiatan.
              </p>
              <p>
                Melalui pengelolaan yang transparan dan amanah, setiap program kerja yang telah dimusyawarahkan dapat dipantau ketercapaiannya secara objektif, demi kemaslahatan bersama.
              </p>
              <div className="pt-2 flex items-center gap-3">
                <HeartHandshake className="w-5 h-5 text-olive" />
                <span className="text-xs font-semibold text-forest">Pengurus Kelompok Kebon Kopi</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Informasi Kegiatan Terbaru */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-olive">Agenda Terdekat</span>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-forest">
              Informasi & Jadwal Kegiatan
            </h2>
          </div>
          <Link
            to="/kegiatan"
            className="inline-flex items-center gap-2 text-sm font-semibold text-olive-dark hover:text-forest transition-colors"
          >
            <span>Lihat Semua Kegiatan</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {upcomingEvents.map((evt) => (
            <div key={evt.id} className="card-soft p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${
                    evt.category === 'Pengajian' ? 'bg-olive-50 text-olive-dark border border-olive-100' : 'bg-beige text-forest border border-beige-dark/30'
                  }`}>
                    {evt.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-ink-subtle">
                    <Calendar className="w-3.5 h-3.5 text-olive" />
                    <span>{evt.date}</span>
                  </div>
                </div>

                <h3 className="font-heading font-bold text-lg text-forest hover:text-olive transition-colors">
                  {evt.title}
                </h3>

                <p className="text-xs text-ink-muted leading-relaxed">
                  {evt.description}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 space-y-2 text-xs text-ink-subtle">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-olive shrink-0" />
                  <span>{evt.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-olive shrink-0" />
                  <span className="truncate">{evt.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Galeri Pilihan */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-forest-50/60 rounded-3xl p-8 sm:p-12 border border-olive-100">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-olive">Dokumentasi</span>
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-forest">
                Dokumentasi Kegiatan Pilihan
              </h2>
            </div>
            <Link
              to="/galeri"
              className="inline-flex items-center gap-2 text-sm font-semibold text-forest hover:text-olive transition-colors"
            >
              <span>Buka Galeri Lengkap</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="group relative rounded-xl overflow-hidden bg-white shadow-xs border border-gray-100 aspect-4/3 flex flex-col justify-end p-4">
                <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/80 via-forest-dark/30 to-transparent z-10" />
                <div className="absolute inset-0 flex items-center justify-center bg-forest/10 group-hover:scale-105 transition-transform duration-300">
                  <ImageIcon className="w-10 h-10 text-olive-light/50" />
                </div>
                <div className="relative z-20 text-white">
                  <span className="text-[10px] font-semibold text-beige bg-forest/80 px-2 py-0.5 rounded">Pengajian Jamaah</span>
                  <p className="text-xs font-bold mt-1">Dokumentasi Pertemuan #{item}</p>
                  <p className="text-[10px] text-gray-300">0{item}/11/2026</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Call To Action (Masuk Pengurus) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-forest rounded-2xl p-8 sm:p-12 text-center text-white relative overflow-hidden shadow-xl">
          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-olive-light/20 text-beige border border-olive-light/30">
              Akses Khusus Pengurus Kelompok
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white">
              Kelola Absensi, Jobdesk, & Musyawarah Secara Digital
            </h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Pengurus dan administrator dapat mengakses dashboard KK-DMS untuk memperbarui data jamaah, menginput absensi, dan memantau hasil keputusan rapat.
            </p>
            <div className="pt-2">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-forest bg-beige hover:bg-white shadow-lg transition-all hover:scale-105 active:scale-100"
              >
                <span>Masuk Dashboard Pengurus</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

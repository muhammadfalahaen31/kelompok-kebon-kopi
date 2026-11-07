import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Search, 
  Filter, 
  Tag, 
  BookOpen, 
  Users, 
  CheckCircle2,
  CalendarDays
} from 'lucide-react';

interface EventItem {
  id: string;
  title: string;
  category: 'Pengajian Rutin' | 'Musyawarah' | 'Kajian Tematik' | 'Kegiatan Sosial';
  date: string;
  time: string;
  location: string;
  description: string;
  status: 'Akan Datang' | 'Selesai';
}

export const KegiatanPublikPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  const events: EventItem[] = [
    {
      id: '1',
      title: 'Pengajian Rutin Malam Rabu',
      category: 'Pengajian Rutin',
      date: '10/11/2026',
      time: '19:30 - 21:00 WIB',
      location: 'Masjid / Sekretariat Kelompok Kebon Kopi',
      description: 'Kajian rutin Al-Qur\'an dan hadits secara mendalam serta absensi berkala jamaah.',
      status: 'Akan Datang',
    },
    {
      id: '2',
      title: 'Musyawarah Kerja Bulanan Penerobos',
      category: 'Musyawarah',
      date: '15/11/2026',
      time: '09:00 - 11:30 WIB',
      location: 'Ruang Musyawarah Kebon Kopi',
      description: 'Evaluasi program bulanan, laporan ketercapaian target, dan penetapan agenda baru.',
      status: 'Akan Datang',
    },
    {
      id: '3',
      title: 'Pengajian Rutin Akhir Pekan',
      category: 'Pengajian Rutin',
      date: '17/11/2026',
      time: '19:30 - 21:00 WIB',
      location: 'Sekretariat Kelompok Kebon Kopi',
      description: 'Pertemuan pengajian pekanan bersama seluruh jamaah untuk mempererat silaturahim.',
      status: 'Akan Datang',
    },
    {
      id: '4',
      title: 'Kajian Tematik Keluarga Sakinah',
      category: 'Kajian Tematik',
      date: '22/11/2026',
      time: '08:30 - 11:00 WIB',
      location: 'Masjid Kebon Kopi',
      description: 'Pembekalan nilai-nilai keislaman dalam membina keharmonisan rumah tangga.',
      status: 'Akan Datang',
    },
    {
      id: '5',
      title: 'Pengajian Rutin Pekan Lalu',
      category: 'Pengajian Rutin',
      date: '03/11/2026',
      time: '19:30 - 21:00 WIB',
      location: 'Masjid Kelompok Kebon Kopi',
      description: 'Telah terlaksana dengan kehadiran 89% jamaah aktif.',
      status: 'Selesai',
    },
  ];

  const categories = ['Semua', 'Pengajian Rutin', 'Musyawarah', 'Kajian Tematik', 'Kegiatan Sosial'];

  const filteredEvents = events.filter((evt) => {
    const matchesSearch = evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          evt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          evt.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Semua' || evt.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="py-12 sm:py-16 space-y-10">
      
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-forest text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-lg">
          <div className="max-w-3xl space-y-4 relative z-10">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-olive-light/20 text-beige border border-olive-light/30">
              Agenda & Kegiatan
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white">
              Informasi Kegiatan Kelompok
            </h1>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Jadwal resmi pengajian pekanan (2–4 kali per pekan), musyawarah kerja, dan kegiatan jamaah Kelompok Kebon Kopi.
            </p>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama kegiatan atau lokasi..."
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-olive focus:border-transparent transition-all"
            />
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  selectedCategory === cat
                    ? 'bg-forest text-white shadow-xs'
                    : 'bg-gray-50 text-ink-muted hover:bg-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* Events List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredEvents.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl border border-gray-100 text-center space-y-3">
            <CalendarDays className="w-12 h-12 text-gray-300 mx-auto" />
            <h3 className="font-heading font-bold text-lg text-ink">Tidak Ada Kegiatan Ditemukan</h3>
            <p className="text-xs text-ink-muted">Coba ubah kata kunci pencarian atau pilih kategori lain.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((evt) => (
              <div key={evt.id} className="card-soft p-6 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-olive-50 text-olive-dark border border-olive-100">
                      {evt.category}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      evt.status === 'Akan Datang' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {evt.status}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-lg text-forest leading-snug">
                    {evt.title}
                  </h3>

                  <p className="text-xs text-ink-muted leading-relaxed line-clamp-3">
                    {evt.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 space-y-2 text-xs text-ink-subtle">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-olive shrink-0" />
                    <span className="font-medium text-ink">{evt.date}</span>
                  </div>
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
        )}
      </section>

    </div>
  );
};

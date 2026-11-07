import React, { useState } from 'react';
import { 
  Image as ImageIcon, 
  Calendar, 
  Tag, 
  ZoomIn, 
  X, 
  FolderOpen 
} from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: 'Pengajian' | 'Musyawarah' | 'Sosial & Silaturahim';
  date: string;
  description: string;
  imageUrl?: string;
}

export const GaleriPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [activePhoto, setActivePhoto] = useState<GalleryItem | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: '1',
      title: 'Pengajian Rutin Pekanan Jamaah Kebon Kopi',
      category: 'Pengajian',
      date: '03/11/2026',
      description: 'Suasana kajian tafsir Al-Qur\'an bersama jamaah.',
    },
    {
      id: '2',
      title: 'Musyawarah Evaluasi Ketercapaian Program Kerja',
      category: 'Musyawarah',
      date: '28/10/2026',
      description: 'Pembahasan progres jobdesk Penerobos dan target akhir tahun.',
    },
    {
      id: '3',
      title: 'Silaturahim & Pengajian Gabungan',
      category: 'Sosial & Silaturahim',
      date: '20/10/2026',
      description: 'Kebersamaan pengurus dan jamaah mempererat tali ukhuwah.',
    },
    {
      id: '4',
      title: 'Kajian Rutin Generasi Muda Kebon Kopi',
      category: 'Pengajian',
      date: '14/10/2026',
      description: 'Pembinaan akhlak dan wawasan keislaman generasi muda.',
    },
    {
      id: '5',
      title: 'Rapat Kerja Tahunan Pengurus Kelompok',
      category: 'Musyawarah',
      date: '05/10/2026',
      description: 'Penyusunan rencana anggaran dan program strategis.',
    },
    {
      id: '6',
      title: 'Gotong Royong & Pemeliharaan Sekretariat',
      category: 'Sosial & Silaturahim',
      date: '29/09/2026',
      description: 'Kerja bakti bersama menjaga kebersihan tempat ibadah dan sekretariat.',
    },
  ];

  const categories = ['Semua', 'Pengajian', 'Musyawarah', 'Sosial & Silaturahim'];

  const filteredItems = galleryItems.filter((item) => {
    return selectedCategory === 'Semua' || item.category === selectedCategory;
  });

  return (
    <div className="py-12 sm:py-16 space-y-10">
      
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-forest text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-lg">
          <div className="max-w-3xl space-y-4 relative z-10">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-olive-light/20 text-beige border border-olive-light/30">
              Dokumentasi Foto
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white">
              Galeri Kegiatan Kelompok
            </h1>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Arsip visual kegiatan pengajian, musyawarah, dan momen kebersamaan jamaah Kelompok Kebon Kopi.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-forest text-white shadow-sm'
                  : 'bg-white text-ink-muted border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div 
              key={item.id}
              onClick={() => setActivePhoto(item)}
              className="card-soft overflow-hidden group cursor-pointer flex flex-col"
            >
              <div className="aspect-16/10 bg-forest-50/80 relative flex items-center justify-center overflow-hidden border-b border-gray-100">
                <div className="w-16 h-16 rounded-full bg-olive-50 flex items-center justify-center text-forest group-hover:scale-110 transition-transform duration-300">
                  <ImageIcon className="w-8 h-8 text-olive" />
                </div>
                <div className="absolute inset-0 bg-forest-dark/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/90 text-forest text-xs font-bold shadow-md">
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>Lihat Detail</span>
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="px-2 py-0.5 rounded font-semibold bg-olive-50 text-olive-dark">
                      {item.category}
                    </span>
                    <div className="flex items-center gap-1 text-ink-subtle">
                      <Calendar className="w-3 h-3 text-olive" />
                      <span>{item.date}</span>
                    </div>
                  </div>

                  <h3 className="font-heading font-bold text-base text-forest group-hover:text-olive transition-colors leading-snug">
                    {item.title}
                  </h3>
                </div>

                <p className="text-xs text-ink-muted leading-relaxed line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div 
          onClick={() => setActivePhoto(null)} 
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative animate-fadeIn"
          >
            <button 
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:text-ink hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-16/10 bg-forest-50 rounded-xl flex items-center justify-center border border-gray-100">
              <ImageIcon className="w-16 h-16 text-olive/60" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-olive-50 text-olive-dark">
                  {activePhoto.category}
                </span>
                <span className="text-xs text-ink-subtle">{activePhoto.date}</span>
              </div>
              <h3 className="font-heading font-bold text-lg text-forest">
                {activePhoto.title}
              </h3>
              <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                {activePhoto.description}
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

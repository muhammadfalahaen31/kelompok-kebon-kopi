import React from 'react';
import { 
  Building2, 
  Target, 
  Compass, 
  Users, 
  Award, 
  CheckCircle,
  HelpCircle,
  Info
} from 'lucide-react';

export const ProfilPage: React.FC = () => {
  return (
    <div className="py-12 sm:py-16 space-y-12 sm:space-y-16">
      
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-forest text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-lg">
          <div className="max-w-3xl space-y-4 relative z-10">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-olive-light/20 text-beige border border-olive-light/30">
              Mengenal Organisasi
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white">
              Profil Kelompok Kebon Kopi
            </h1>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Membangun komunitas yang kokoh dalam ukhuwah, tertib dalam ibadah, dan transparan dalam administrasi kelompok.
            </p>
          </div>
        </div>
      </section>

      {/* Sejarah & Informasi Umum */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <Building2 className="w-6 h-6 text-olive" />
                <h2 className="text-2xl font-heading font-bold text-forest">Sejarah Singkat</h2>
              </div>
              <div className="text-ink-muted text-sm sm:text-base leading-relaxed space-y-3">
                <p>
                  Kelompok Kebon Kopi didirikan sebagai wadah kebersamaan dan pembinaan jamaah di lingkungan Kebon Kopi. Berawal dari majelis pengajian rutin dan musyawarah berkala, kelompok ini terus tumbuh dengan mengedepankan prinsip musyawarah untuk mufakat dan kepedulian antar-sesama jamaah.
                </p>
                <div className="p-4 rounded-xl bg-beige-light border border-beige-dark/30 flex items-start gap-3 text-xs text-forest">
                  <Info className="w-4 h-4 text-olive shrink-0 mt-0.5" />
                  <p>
                    <em>Catatan:</em> Detail kronologi sejarah resmi kelompok dapat disunting dan disesuaikan melalui menu Pengaturan Konten Publik di Dashboard Admin.
                  </p>
                </div>
              </div>
            </div>

            {/* Visi dan Misi */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Visi */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-3">
                <div className="flex items-center gap-3">
                  <Compass className="w-6 h-6 text-olive" />
                  <h3 className="text-xl font-heading font-bold text-forest">Visi</h3>
                </div>
                <p className="text-ink-muted text-sm leading-relaxed">
                  "Menjadi kelompok jamaah yang beriman, bertakwa, mandiri, dan berdaya guna dalam membina generasi serta memelihara ukhuwah yang harmonis."
                </p>
              </div>

              {/* Misi */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-3">
                <div className="flex items-center gap-3">
                  <Target className="w-6 h-6 text-olive" />
                  <h3 className="text-xl font-heading font-bold text-forest">Misi</h3>
                </div>
                <ul className="text-ink-muted text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-olive shrink-0 mt-0.5" />
                    <span>Menyelenggarakan pengajian rutin secara tertib dan berkesinambungan.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-olive shrink-0 mt-0.5" />
                    <span>Meningkatkan transparansi administrasi dan pertanggungjawaban program.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-olive shrink-0 mt-0.5" />
                    <span>Membina keaktifan seluruh jamaah dari berbagai generasi.</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>

          {/* Sidebar Info Ringkas */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
              <h3 className="font-heading font-bold text-lg text-forest border-b border-gray-100 pb-3">
                Informasi Umum
              </h3>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="text-xs text-ink-subtle">Nama Organisasi</dt>
                  <dd className="font-semibold text-ink">Kelompok Kebon Kopi</dd>
                </div>
                <div>
                  <dt className="text-xs text-ink-subtle">Sistem Manajemen</dt>
                  <dd className="font-semibold text-ink">KK-DMS (Digital Management)</dd>
                </div>
                <div>
                  <dt className="text-xs text-ink-subtle">Frekuensi Kegiatan</dt>
                  <dd className="font-semibold text-ink">2 - 4 kali pertemuan sepekan</dd>
                </div>
                <div>
                  <dt className="text-xs text-ink-subtle">Zona Waktu</dt>
                  <dd className="font-semibold text-ink">Asia/Jakarta (WIB)</dd>
                </div>
              </dl>
            </div>
          </div>

        </div>
      </section>

      {/* Struktur Organisasi */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-8 sm:p-12 border border-gray-100 shadow-sm space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-olive">Kepengurusan</span>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-forest">
              Struktur Organisasi Kelompok
            </h2>
            <p className="text-xs text-ink-muted">
              Bagan struktur kepengurusan dan divisi tugas yang telah disepakati bersama.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { role: 'Ketua Kelompok', desc: 'Koordinator umum seluruh kegiatan dan kebijakan kelompok.' },
              { role: 'Sekretariat & Administrasi', desc: 'Pengelolaan data jamaah, arsip, dan notulensi musyawarah.' },
              { role: 'Bendahara & Keuangan', desc: 'Pencatatan dan transparansi kas serta operasional kegiatan.' },
              { role: 'Divisi Penerobos', desc: 'Tim pelaksana terdepan untuk eksekusi target dan program kelompok.' },
            ].map((st, idx) => (
              <div key={idx} className="p-6 rounded-xl bg-canvas border border-gray-100 text-center space-y-3 hover:border-olive transition-colors">
                <div className="w-12 h-12 rounded-full bg-olive-50 text-forest mx-auto flex items-center justify-center font-bold">
                  <Users className="w-6 h-6 text-olive" />
                </div>
                <h4 className="font-heading font-bold text-forest text-base">{st.role}</h4>
                <p className="text-xs text-ink-muted leading-relaxed">{st.desc}</p>
                <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-medium bg-white text-ink-subtle border border-gray-200">
                  Resmi Terdaftar
                </span>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 text-center text-xs text-ink-subtle">
            * Nama resmi pejabat kepengurusan akan diperbarui setelah dokumen SK resmi diunggah oleh pengurus pada modul Pengaturan.
          </div>
        </div>
      </section>

    </div>
  );
};

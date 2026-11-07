import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageSquare, 
  Send, 
  CheckCircle2,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

export const KontakPage: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nama: '',
    kontak: '',
    kategori: 'Pertanyaan Umum',
    pesan: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="py-12 sm:py-16 space-y-12">
      
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-forest text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-lg">
          <div className="max-w-3xl space-y-4 relative z-10">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-olive-light/20 text-beige border border-olive-light/30">
              Sekretariat & Hubungan Jamaah
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white">
              Hubungi Kelompok Kebon Kopi
            </h1>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Silakan hubungi pengurus untuk informasi kegiatan, konfirmasi jadwal pengajian, maupun koordinasi musyawarah.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid: Info + Contact Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Contact Information Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
              <h2 className="font-heading font-bold text-xl text-forest border-b border-gray-100 pb-3">
                Informasi Kontak Resmi
              </h2>

              <div className="space-y-5">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-olive-50 flex items-center justify-center text-forest shrink-0">
                    <MapPin className="w-5 h-5 text-olive" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-ink-subtle uppercase">Alamat Sekretariat</h3>
                    <p className="text-sm font-semibold text-ink mt-0.5">
                      Sekretariat Kelompok Kebon Kopi
                    </p>
                    <p className="text-xs text-ink-muted mt-0.5">
                      (Alamat lengkap dapat disesuaikan melalui pengaturan admin)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-olive-50 flex items-center justify-center text-forest shrink-0">
                    <Phone className="w-5 h-5 text-olive" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-ink-subtle uppercase">Layanan WhatsApp</h3>
                    <p className="text-sm font-semibold text-ink mt-0.5">
                      Pengurus Kelompok Kebon Kopi
                    </p>
                    <a
                      href="https://wa.me/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-olive-dark hover:text-forest font-semibold mt-1"
                    >
                      <span>Kirim Pesan WhatsApp</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-olive-50 flex items-center justify-center text-forest shrink-0">
                    <Clock className="w-5 h-5 text-olive" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-ink-subtle uppercase">Waktu Koordinasi</h3>
                    <p className="text-sm font-semibold text-ink mt-0.5">
                      Senin - Ahad (Menyesuaikan Jadwal Pengajian)
                    </p>
                    <p className="text-xs text-ink-muted">Zona Waktu: Asia/Jakarta (WIB)</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-beige-light border border-beige-dark/30 text-xs text-forest space-y-1">
                <p className="font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-olive" />
                  Komitmen Pelayanan
                </p>
                <p className="text-ink-muted leading-relaxed">
                  Semua masukan dan komunikasi dari jamaah akan dimusyawarahkan dengan penuh amanah oleh pengurus kelompok.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Aspirasi / Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 sm:p-10 rounded-2xl border border-gray-100 shadow-sm space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-olive">Sampaikan Masukan</span>
                <h2 className="text-2xl font-heading font-bold text-forest mt-1">
                  Kirim Pesan atau Aspirasi
                </h2>
                <p className="text-xs text-ink-muted mt-1">
                  Formulir ini dapat digunakan oleh jamaah maupun masyarakat umum untuk menyampaikan pertanyaan seputar kegiatan kelompok.
                </p>
              </div>

              {formSubmitted ? (
                <div className="p-8 rounded-2xl bg-olive-50 border border-olive-200 text-center space-y-3 animate-fadeIn">
                  <CheckCircle2 className="w-12 h-12 text-olive mx-auto" />
                  <h3 className="font-heading font-bold text-lg text-forest">Pesan Berhasil Terkirim!</h3>
                  <p className="text-xs text-ink-muted max-w-md mx-auto">
                    Terima kasih atas pesan dan masukan Anda. Pengurus Kelompok Kebon Kopi akan menindaklanjutinya dalam waktu dekat.
                  </p>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({ nama: '', kontak: '', kategori: 'Pertanyaan Umum', pesan: '' });
                    }}
                    className="mt-3 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-forest hover:bg-forest-light transition-colors"
                  >
                    Kirim Pesan Lain
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-ink">Nama Lengkap *</label>
                      <input
                        type="text"
                        required
                        value={formData.nama}
                        onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                        placeholder="Contoh: Muhammad Rizky"
                        className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-olive focus:border-transparent"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-ink">Nomor HP / WhatsApp *</label>
                      <input
                        type="text"
                        required
                        value={formData.kontak}
                        onChange={(e) => setFormData({ ...formData, kontak: e.target.value })}
                        placeholder="Contoh: 081234567890"
                        className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-olive focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-ink">Kategori Pesan</label>
                    <select
                      value={formData.kategori}
                      onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-olive focus:border-transparent"
                    >
                      <option>Pertanyaan Umum</option>
                      <option>Konfirmasi Jadwal Pengajian</option>
                      <option>Aspirasi & Masukan Musyawarah</option>
                      <option>Dokumentasi Kegiatan</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-ink">Isi Pesan *</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.pesan}
                      onChange={(e) => setFormData({ ...formData, pesan: e.target.value })}
                      placeholder="Tuliskan pesan atau pertanyaan Anda..."
                      className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-olive focus:border-transparent"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 w-full py-3 px-6 rounded-xl font-bold text-white bg-forest hover:bg-forest-light shadow-md transition-all hover:shadow-lg"
                  >
                    <Send className="w-4 h-4 text-olive-light" />
                    <span>Kirim Pesan</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

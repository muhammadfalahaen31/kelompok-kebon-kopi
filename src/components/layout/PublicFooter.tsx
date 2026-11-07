import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Heart } from 'lucide-react';

export const PublicFooter: React.FC = () => {
  return (
    <footer className="bg-forest text-white border-t border-forest-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Identity & About */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="/logo-placeholder.svg" 
                alt="Logo Kelompok Kebon Kopi" 
                className="w-12 h-12 object-contain bg-white rounded-full p-1"
              />
              <div>
                <h3 className="font-heading font-bold text-lg text-white">KELOMPOK KEBON KOPI</h3>
                <p className="text-xs text-olive-light">Digital Management System (KK-DMS)</p>
              </div>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              Pusat informasi, administrasi, dan koordinasi digital kegiatan jamaah Kelompok Kebon Kopi yang transparan, modern, dan amanah.
            </p>
            <div className="flex items-center gap-2 text-xs text-olive-light">
              <ShieldCheck className="w-4 h-4" />
              <span>Sistem Manajemen Berkelanjutan</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-heading font-semibold text-base text-beige">Menu Utama</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link to="/" className="hover:text-beige transition-colors">Beranda</Link>
              </li>
              <li>
                <Link to="/profil" className="hover:text-beige transition-colors">Profil Kelompok</Link>
              </li>
              <li>
                <Link to="/kegiatan" className="hover:text-beige transition-colors">Informasi Kegiatan</Link>
              </li>
              <li>
                <Link to="/galeri" className="hover:text-beige transition-colors">Galeri Dokumentasi</Link>
              </li>
              <li>
                <Link to="/kontak" className="hover:text-beige transition-colors">Hubungi Kami</Link>
              </li>
            </ul>
          </div>

          {/* Pengajian Rutin */}
          <div className="space-y-3">
            <h4 className="font-heading font-semibold text-base text-beige">Jadwal Rutin</h4>
            <div className="space-y-2.5 text-sm text-gray-300">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-olive-light mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-white">Pengajian Rutin</p>
                  <p className="text-xs text-gray-300">2 - 4 kali setiap pekan</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-olive-light mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-white">Musyawarah Pengurus</p>
                  <p className="text-xs text-gray-300">Berkala bulanan & evaluasi program</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sekretariat & Kontak */}
          <div className="space-y-3">
            <h4 className="font-heading font-semibold text-base text-beige">Sekretariat & Kontak</h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-olive-light mt-0.5 shrink-0" />
                <span>Sekretariat Kelompok Kebon Kopi (Alamat resmi dapat diperbarui melalui pengaturan admin)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-olive-light shrink-0" />
                <span>Tersedia via tautan WhatsApp pengurus</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-olive-light shrink-0" />
                <span>info@kelompokkebonkopi.id (Placeholder)</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-forest-light/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-300">
          <p>© 2026 Kelompok Kebon Kopi — KK-DMS. Seluruh hak cipta dilindungi.</p>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-olive-light hover:text-white transition-colors">
              Halaman Pengurus (Login)
            </Link>
            <span>•</span>
            <span className="text-gray-400">Asia/Jakarta (WIB)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

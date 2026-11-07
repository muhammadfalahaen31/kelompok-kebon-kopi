import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LogIn, ExternalLink, Moon, Sun, Shield } from 'lucide-react';

export const PublicNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Beranda', path: '/' },
    { name: 'Profil Kelompok', path: '/profil' },
    { name: 'Informasi Kegiatan', path: '/kegiatan' },
    { name: 'Galeri Kegiatan', path: '/galeri' },
    { name: 'Hubungi Kami', path: '/kontak' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Identity */}
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src="/logo-placeholder.svg" 
              alt="Logo Kelompok Kebon Kopi" 
              className="w-12 h-12 object-contain transition-transform group-hover:scale-105"
            />
            <div>
              <span className="block font-heading font-bold text-lg text-forest tracking-tight leading-tight">
                KELOMPOK KEBON KOPI
              </span>
              <span className="block text-xs font-medium text-olive-dark tracking-wide">
                Digital Management System (KK-DMS)
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-forest font-semibold bg-olive-50 border-b-2 border-forest'
                    : 'text-ink-muted hover:text-forest hover:bg-gray-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Action Button: Masuk Pengurus */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-forest hover:bg-forest-light shadow-sm transition-all hover:shadow hover:-translate-y-0.5 active:translate-y-0"
            >
              <Shield className="w-4 h-4 text-olive-light" />
              <span>Akses Pengurus</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-ink hover:text-forest hover:bg-gray-100 focus:outline-hidden"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg animate-fadeIn">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2.5 rounded-lg text-base font-medium ${
                isActive(link.path)
                  ? 'text-forest font-bold bg-olive-50'
                  : 'text-ink hover:bg-gray-50'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-3 border-t border-gray-100">
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg font-semibold text-white bg-forest hover:bg-forest-light transition-colors"
            >
              <LogIn className="w-4 h-4" />
              <span>Akses Pengurus (Login)</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

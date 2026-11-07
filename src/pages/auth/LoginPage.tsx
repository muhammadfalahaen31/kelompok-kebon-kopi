import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Lock, 
  Mail, 
  ArrowRight, 
  ShieldCheck, 
  ArrowLeft, 
  AlertCircle,
  Eye,
  EyeOff
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // In Phase 1 Foundation, simulate direct navigation to /dashboard
    // In Phase 2, this will be connected to Firebase Auth signInWithEmailAndPassword
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-canvas flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Decorative Blur Orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-olive-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-beige/50 rounded-full blur-3xl pointer-events-none" />

      {/* Back to Home Link */}
      <div className="max-w-md w-full mx-auto px-4 mb-6">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-xs font-semibold text-ink-muted hover:text-forest transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Website Publik</span>
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="text-center space-y-3">
          <img 
            src="/logo-placeholder.svg" 
            alt="Logo KK-DMS" 
            className="w-16 h-16 object-contain mx-auto bg-white rounded-full p-2 border border-olive-100 shadow-sm"
          />
          <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-forest">
            Akses Pengurus KK-DMS
          </h2>
          <p className="text-xs text-ink-muted max-w-xs mx-auto">
            Sistem Informasi & Manajemen Digital Kelompok Kebon Kopi
          </p>
        </div>

        <div className="mt-8 bg-white py-8 px-6 sm:px-10 rounded-2xl shadow-xl border border-gray-100">
          
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            
            <div className="space-y-1">
              <label className="text-xs font-semibold text-ink">Alamat Email Pengurus</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@kelompokkebonkopi.id"
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-olive focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-ink">Kata Sandi</label>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-olive focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-ink focus:outline-hidden"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-white bg-forest hover:bg-forest-light shadow-md transition-all hover:shadow-lg disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="text-xs">Memverifikasi hak akses...</span>
                ) : (
                  <>
                    <span>Masuk ke Dashboard</span>
                    <ArrowRight className="w-4 h-4 text-olive-light" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Role Access Information */}
          <div className="mt-6 pt-6 border-t border-gray-100 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-forest">
              <ShieldCheck className="w-4 h-4 text-olive" />
              <span>Tingkatan Hak Akses Sistem:</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-[10px] text-center pt-1">
              <div className="p-2 rounded-lg bg-gray-50 border border-gray-100">
                <p className="font-bold text-forest">Super Admin</p>
                <p className="text-ink-subtle">Akses Penuh</p>
              </div>
              <div className="p-2 rounded-lg bg-gray-50 border border-gray-100">
                <p className="font-bold text-forest">Admin</p>
                <p className="text-ink-subtle">Kelola Modul</p>
              </div>
              <div className="p-2 rounded-lg bg-gray-50 border border-gray-100">
                <p className="font-bold text-forest">Pengurus</p>
                <p className="text-ink-subtle">Sesuai Izin</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

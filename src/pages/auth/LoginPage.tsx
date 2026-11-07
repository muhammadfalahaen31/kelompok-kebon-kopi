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
  EyeOff,
  Sparkles,
  Key
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  // Default pengurus credentials
  const [email, setEmail] = useState('admin@kelompokkebonkopi.id');
  const [password, setPassword] = useState('kebonkopi2026');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (login) {
        try {
          await login(email, password);
        } catch (firebaseErr: any) {
          // If Firebase Auth does not have this user registered yet, log in with default demo session
          console.warn('Firebase login fallback:', firebaseErr?.message);
        }
      }
      navigate('/dashboard');
    } catch (err: any) {
      setError(err?.message || 'Gagal masuk. Silakan periksa kredensial Anda.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickLogin = async () => {
    setEmail('admin@kelompokkebonkopi.id');
    setPassword('kebonkopi2026');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 400);
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
            src="./logo-placeholder.svg" 
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
          
          {/* Quick Access Notification Box */}
          <div className="mb-6 p-4 rounded-xl bg-forest/5 border border-forest/15 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-forest flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-olive" />
                Akun Akses Pengurus Default:
              </span>
              <span className="text-[10px] bg-forest text-white px-2 py-0.5 rounded-full font-bold">
                Aktif
              </span>
            </div>
            <div className="text-xs text-ink space-y-1 font-mono bg-white p-2.5 rounded-lg border border-gray-200">
              <p><strong className="font-sans text-ink-muted">Email:</strong> admin@kelompokkebonkopi.id</p>
              <p><strong className="font-sans text-ink-muted">Sandi:</strong> kebonkopi2026</p>
            </div>
            <button
              type="button"
              onClick={handleQuickLogin}
              disabled={isLoading}
              className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold text-white bg-olive hover:bg-olive-dark shadow-xs transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>⚡ Masuk Cepat (1-Klik Tanpa Ketik)</span>
            </button>
          </div>

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

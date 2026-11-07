import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  CheckSquare, 
  Scale, 
  Users, 
  BarChart3, 
  FolderArchive, 
  Settings, 
  LogOut, 
  Globe, 
  ChevronRight,
  X,
  UserCheck
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DashboardSidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const navigationItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Jobdesk Penerobos', path: '/dashboard/penerobos', icon: Briefcase },
    { name: 'Absensi Pengajian', path: '/dashboard/absensi', icon: CheckSquare },
    { name: 'Hasil Musyawarah', path: '/dashboard/musyawarah', icon: Scale },
    { name: 'Data Jamaah', path: '/dashboard/jamaah', icon: Users },
    { name: 'Laporan & Statistik', path: '/dashboard/laporan', icon: BarChart3 },
    { name: 'Arsip & Dokumen', path: '/dashboard/arsip', icon: FolderArchive },
    { name: 'Pengaturan', path: '/dashboard/pengaturan', icon: Settings },
  ];

  const handleLogout = () => {
    // Phase 1 navigation, will connect to Firebase Auth signOut in Phase 2
    navigate('/');
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={onClose} 
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-forest text-white flex flex-col shadow-xl transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="h-20 px-6 flex items-center justify-between border-b border-forest-light/40 bg-forest-dark">
          <Link to="/dashboard" className="flex items-center gap-3">
            <img 
              src="./logo-placeholder.svg" 
              alt="Logo KK-DMS" 
              className="w-10 h-10 object-contain bg-white rounded-full p-1"
            />
            <div>
              <span className="block font-heading font-bold text-base text-white tracking-wide">
                KK-DMS
              </span>
              <span className="block text-[11px] text-olive-light font-medium tracking-wider uppercase">
                Kelompok Kebon Kopi
              </span>
            </div>
          </Link>

          <button 
            onClick={onClose} 
            className="p-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-forest-light/50 lg:hidden"
            aria-label="Tutup Menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Quick Info Box */}
        <div className="px-5 py-4 bg-forest/60 border-b border-forest-light/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-olive flex items-center justify-center font-bold text-white shadow-xs">
              <UserCheck className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">Administrator</p>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-olive/30 text-beige-light border border-olive-light/30">
                Super Admin
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/dashboard'}
                onClick={() => onClose()}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                    isActive
                      ? 'bg-olive text-white shadow-sm font-semibold'
                      : 'text-gray-300 hover:text-white hover:bg-forest-light/40'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-beige group-hover:text-white transition-colors" />
                  <span>{item.name}</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </NavLink>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-forest-light/30 bg-forest-dark/80 space-y-2">
          <Link
            to="/"
            className="flex items-center gap-3 px-3.5 py-2 rounded-lg text-xs font-medium text-gray-300 hover:text-white hover:bg-forest-light/30 transition-colors"
          >
            <Globe className="w-4 h-4 text-olive-light" />
            <span>Lihat Website Publik</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2 rounded-lg text-xs font-semibold text-red-300 hover:text-red-100 hover:bg-red-950/40 transition-colors"
          >
            <LogOut className="w-4 h-4 text-red-400" />
            <span>Keluar Sistem</span>
          </button>
        </div>
      </aside>
    </>
  );
};

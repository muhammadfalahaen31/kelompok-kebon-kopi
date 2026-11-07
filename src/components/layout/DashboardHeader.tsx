import React, { useState, useEffect } from 'react';
import { Menu, Search, Clock, Shield, Bell } from 'lucide-react';
import { formatDateTimeWIB } from '../../utils/dateUtils';

interface HeaderProps {
  onToggleSidebar: () => void;
}

export const DashboardHeader: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const [currentDateTime, setCurrentDateTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      setCurrentDateTime(formatDateTimeWIB(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-xs h-20">
      <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        
        {/* Left: Mobile Toggle & Breadcrumb / Search */}
        <div className="flex items-center gap-3 lg:gap-6 flex-1 max-w-md">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg text-ink hover:text-forest hover:bg-gray-100 lg:hidden"
            aria-label="Buka Navigasi"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="relative w-full hidden sm:block">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Pencarian cepat jamaah, kegiatan, musyawarah..."
              className="w-full pl-10 pr-4 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-olive focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Right: Timezone Indicator & User Status */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Realtime Clock & Timezone */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-olive-50/70 border border-olive-100 text-xs text-forest font-medium">
            <Clock className="w-3.5 h-3.5 text-olive" />
            <span>{currentDateTime || 'WIB (Asia/Jakarta)'}</span>
          </div>

          {/* User Badge */}
          <div className="flex items-center gap-2.5 pl-2 sm:pl-4 border-l border-gray-200">
            <div className="w-9 h-9 rounded-full bg-forest text-beige flex items-center justify-center font-bold text-xs shadow-xs">
              AD
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-bold text-ink leading-tight">Pengurus Utama</p>
              <p className="text-[11px] text-olive-dark font-medium">Super Admin</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

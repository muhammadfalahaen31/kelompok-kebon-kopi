import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { DashboardSidebar } from './DashboardSidebar';
import { DashboardHeader } from './DashboardHeader';

export const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-canvas flex flex-col">
      {/* Sidebar */}
      <DashboardSidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />

      {/* Main Wrapper with desktop padding for sidebar */}
      <div className="lg:pl-72 flex flex-col flex-1">
        <DashboardHeader 
          onToggleSidebar={() => setSidebarOpen(true)} 
        />
        
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>

        <footer className="py-4 px-6 border-t border-gray-200/80 text-center text-xs text-ink-subtle">
          KK-DMS Kelompok Kebon Kopi • Sistem Informasi & Manajemen Digital • Zona Waktu Asia/Jakarta
        </footer>
      </div>
    </div>
  );
};

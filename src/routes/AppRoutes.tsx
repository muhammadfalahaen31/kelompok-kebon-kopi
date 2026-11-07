import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import { PublicLayout } from '../components/layout/PublicLayout';
import { DashboardLayout } from '../components/layout/DashboardLayout';

// Public Pages
import { BerandaPage } from '../pages/public/BerandaPage';
import { ProfilPage } from '../pages/public/ProfilPage';
import { KegiatanPublikPage } from '../pages/public/KegiatanPublikPage';
import { GaleriPage } from '../pages/public/GaleriPage';
import { KontakPage } from '../pages/public/KontakPage';

// Auth Page
import { LoginPage } from '../pages/auth/LoginPage';

// Dashboard Pages
import { DashboardOverview } from '../pages/dashboard/DashboardOverview';
import { JamaahListPage } from '../pages/dashboard/jamaah/JamaahListPage';
import { AttendanceListPage } from '../pages/dashboard/attendance/AttendanceListPage';
import { PenerobosListPage } from '../pages/dashboard/penerobos/PenerobosListPage';
import { MusyawarahListPage } from '../pages/dashboard/musyawarah/MusyawarahListPage';
import { ReportsPage } from '../pages/dashboard/reports/ReportsPage';
import { DocumentsPage } from '../pages/dashboard/documents/DocumentsPage';
import { SettingsPage } from '../pages/dashboard/settings/SettingsPage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Area 1: Website Publik */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<BerandaPage />} />
        <Route path="profil" element={<ProfilPage />} />
        <Route path="kegiatan" element={<KegiatanPublikPage />} />
        <Route path="galeri" element={<GaleriPage />} />
        <Route path="kontak" element={<KontakPage />} />
      </Route>

      {/* Auth */}
      <Route path="/login" element={<LoginPage />} />

      {/* Area 2: Dashboard Administrasi (KK-DMS) */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardOverview />} />
        <Route path="penerobos" element={<PenerobosListPage />} />
        <Route path="absensi" element={<AttendanceListPage />} />
        <Route path="musyawarah" element={<MusyawarahListPage />} />
        <Route path="jamaah" element={<JamaahListPage />} />
        <Route path="laporan" element={<ReportsPage />} />
        <Route path="arsip" element={<DocumentsPage />} />
        <Route path="pengaturan" element={<SettingsPage />} />
      </Route>

      {/* 404 Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

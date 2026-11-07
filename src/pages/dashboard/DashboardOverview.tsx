import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Briefcase, 
  Calendar, 
  CheckCircle2, 
  Scale, 
  Clock, 
  AlertCircle, 
  TrendingUp, 
  Filter, 
  ArrowUpRight,
  PlusCircle,
  FileSpreadsheet,
  ChevronRight
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  PieChart, 
  Pie, 
  Cell,
  LineChart,
  Line
} from 'recharts';

export const DashboardOverview: React.FC = () => {
  const [filterPeriod, setFilterPeriod] = useState<'minggu' | 'bulan' | 'tahun'>('bulan');

  // Realistic sample data for Phase 1 UI skeleton preview
  // Connected to live Firestore in Phase 2
  const statCards = [
    { title: 'Total Jamaah', value: '142', sub: '78 Laki-laki • 64 Perempuan', icon: Users, color: 'text-forest', bg: 'bg-olive-50' },
    { title: 'Anggota Penerobos', value: '18', sub: 'Semua divisi aktif', icon: Briefcase, color: 'text-olive-dark', bg: 'bg-olive-50' },
    { title: 'Pengajian Bulan Ini', value: '8', sub: '2x per pekan', icon: Calendar, color: 'text-forest', bg: 'bg-beige-light' },
    { title: 'Persentase Kehadiran', value: '88.5%', sub: '+3.2% dari bulan lalu', icon: TrendingUp, color: 'text-emerald-700', bg: 'bg-emerald-50' },
    { title: 'Hasil Musyawarah', value: '14', sub: 'Keputusan tercatat', icon: Scale, color: 'text-forest', bg: 'bg-blue-50' },
    { title: 'Program Selesai', value: '8', sub: '57% dari total keputusan', icon: CheckCircle2, color: 'text-emerald-700', bg: 'bg-emerald-50' },
    { title: 'Sedang Berjalan', value: '4', sub: 'Target berjalan aktif', icon: Clock, color: 'text-amber-700', bg: 'bg-amber-50' },
    { title: 'Belum Terlaksana', value: '2', sub: 'Agenda berikutnya', icon: AlertCircle, color: 'text-rose-700', bg: 'bg-rose-50' },
  ];

  const attendanceData = [
    { tanggal: '03/10', Hadir: 128, Izin: 6, Sakit: 4, Alpa: 4 },
    { tanggal: '10/10', Hadir: 132, Izin: 4, Sakit: 3, Alpa: 3 },
    { tanggal: '17/10', Hadir: 125, Izin: 8, Sakit: 5, Alpa: 4 },
    { tanggal: '24/10', Hadir: 130, Izin: 5, Sakit: 4, Alpa: 3 },
    { tanggal: '31/10', Hadir: 134, Izin: 3, Sakit: 2, Alpa: 3 },
    { tanggal: '07/11', Hadir: 131, Izin: 5, Sakit: 3, Alpa: 3 },
  ];

  const musyawarahStatusData = [
    { name: 'Selesai', value: 8, color: '#10B981' },
    { name: 'Sedang Berjalan', value: 4, color: '#F59E0B' },
    { name: 'Belum Terlaksana', value: 2, color: '#EF4444' },
  ];

  const recentActivities = [
    { id: '1', user: 'Ahmad (Super Admin)', action: 'Mengimpor data jamaah via Excel', time: '1 jam yang lalu', module: 'Data Jamaah' },
    { id: '2', user: 'H. Budi (Admin)', action: 'Membuat jadwal Pengajian Rutin 10/11/2026', time: '3 jam yang lalu', module: 'Absensi' },
    { id: '3', user: 'Ridwan (Pengurus)', action: 'Memperbarui progres Musyawarah: Renovasi Sekretariat (75%)', time: 'Kemarin', module: 'Musyawarah' },
    { id: '4', user: 'Ahmad (Super Admin)', action: 'Memperbarui jobdesk Penerobos Divisi Kebersihan', time: '2 hari lalu', module: 'Jobdesk' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Top Welcome & Period Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-xs">
        <div>
          <h1 className="text-2xl font-heading font-bold text-forest">
            Dashboard Kelompok Kebon Kopi
          </h1>
          <p className="text-xs text-ink-muted mt-0.5">
            Ringkasan data jamaah, absensi pengajian, dan ketercapaian program kelompok.
          </p>
        </div>

        {/* Filter Period Buttons */}
        <div className="flex items-center gap-2">
          <div className="flex items-center p-1 bg-gray-100 rounded-xl">
            {(['minggu', 'bulan', 'tahun'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setFilterPeriod(p)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                  filterPeriod === p
                    ? 'bg-white text-forest shadow-xs'
                    : 'text-ink-muted hover:text-ink'
                }`}
              >
                {p === 'minggu' ? 'Minggu Ini' : p === 'bulan' ? 'Bulan Ini' : 'Tahun Ini'}
              </button>
            ))}
          </div>

          <Link
            to="/dashboard/jamaah"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-forest hover:bg-forest-light transition-colors"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Kelola Jamaah</span>
          </Link>
        </div>
      </div>

      {/* 8 Key Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div key={idx} className="card-soft p-5 flex flex-col justify-between space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-ink-muted truncate">{card.title}</span>
                <div className={`w-8 h-8 rounded-lg ${card.bg} flex items-center justify-center ${card.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-heading font-bold text-forest">{card.value}</p>
                <p className="text-[11px] text-ink-subtle mt-1">{card.sub}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section: Attendance Bar + Musyawarah Pie */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Attendance Trend Chart */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div>
              <h2 className="font-heading font-bold text-base text-forest">
                Grafik Kehadiran Pengajian Jamaah
              </h2>
              <p className="text-xs text-ink-subtle">Tren kehadiran dalam 6 pertemuan terakhir (DD/MM/YYYY)</p>
            </div>
            <Link 
              to="/dashboard/absensi" 
              className="text-xs font-semibold text-olive-dark hover:text-forest inline-flex items-center gap-1"
            >
              <span>Rekap Detail</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="tanggal" tick={{ fontSize: 11, fill: '#6B7280' }} />
                <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '8px', border: '1px solid #E5E7EB', fontSize: '12px' }} 
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar dataKey="Hadir" fill="#174A35" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Izin" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Sakit" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Alpa" fill="#EF4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Musyawarah Donut Chart */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h2 className="font-heading font-bold text-base text-forest">
                  Ketercapaian Musyawarah
                </h2>
                <p className="text-xs text-ink-subtle">Status program kerja aktif</p>
              </div>
              <Link 
                to="/dashboard/musyawarah" 
                className="text-xs font-semibold text-olive-dark hover:text-forest"
              >
                Lihat Semua
              </Link>
            </div>

            <div className="h-52 w-full flex items-center justify-center pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={musyawarahStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {musyawarahStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-2 pt-2 border-t border-gray-100">
              {musyawarahStatusData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-ink">{item.name}</span>
                  </div>
                  <span className="font-bold text-forest">{item.value} Program</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-olive-50 rounded-xl text-center">
            <p className="text-[11px] text-olive-dark font-medium">Tingkat Ketercapaian Rata-Rata</p>
            <p className="text-xl font-heading font-bold text-forest">78.5%</p>
          </div>
        </div>

      </div>

      {/* Bottom Section: Quick Actions & Recent Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Quick Modules Shortcuts */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-4">
          <h2 className="font-heading font-bold text-base text-forest border-b border-gray-100 pb-3">
            Aksi Cepat Pengurus
          </h2>

          <div className="space-y-2.5">
            <Link
              to="/dashboard/absensi"
              className="p-3.5 rounded-xl border border-gray-100 hover:border-olive hover:bg-olive-50/50 flex items-center justify-between group transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-forest text-beige flex items-center justify-center font-bold">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-forest group-hover:text-olive-dark">Input Absensi Pengajian</p>
                  <p className="text-[11px] text-ink-subtle">Pilih jadwal lalu tandai kehadiran jamaah</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-forest transition-colors" />
            </Link>

            <Link
              to="/dashboard/jamaah"
              className="p-3.5 rounded-xl border border-gray-100 hover:border-olive hover:bg-olive-50/50 flex items-center justify-between group transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-olive text-white flex items-center justify-center font-bold">
                  <FileSpreadsheet className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-forest group-hover:text-olive-dark">Import Jamaah dari Excel</p>
                  <p className="text-[11px] text-ink-subtle">Unggah file XLSX dengan validasi nama & gender</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-forest transition-colors" />
            </Link>

            <Link
              to="/dashboard/musyawarah"
              className="p-3.5 rounded-xl border border-gray-100 hover:border-olive hover:bg-olive-50/50 flex items-center justify-between group transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-beige text-forest flex items-center justify-center font-bold">
                  <Scale className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-forest group-hover:text-olive-dark">Tambah Keputusan Musyawarah</p>
                  <p className="text-[11px] text-ink-subtle">Catat target, progres, dan penanggung jawab</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-forest transition-colors" />
            </Link>
          </div>
        </div>

        {/* Recent Audit Activities */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div>
              <h2 className="font-heading font-bold text-base text-forest">
                Aktivitas Pengurus Terbaru
              </h2>
              <p className="text-xs text-ink-subtle">Catatan audit log sistem KK-DMS</p>
            </div>
            <Link to="/dashboard/pengaturan" className="text-xs font-semibold text-olive-dark hover:text-forest">
              Log Lengkap
            </Link>
          </div>

          <div className="divide-y divide-gray-100">
            {recentActivities.map((act) => (
              <div key={act.id} className="py-3 flex items-start justify-between gap-4">
                <div className="space-y-0.5">
                  <p className="text-xs font-semibold text-ink">{act.action}</p>
                  <p className="text-[11px] text-ink-subtle">{act.user} • <span className="text-olive font-medium">{act.module}</span></p>
                </div>
                <span className="text-[10px] text-gray-400 shrink-0">{act.time}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

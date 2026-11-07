import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Plus, 
  Search, 
  CheckCheck, 
  Users, 
  FileText, 
  Filter, 
  ChevronRight, 
  Save, 
  AlertCircle,
  X,
  TrendingUp
} from 'lucide-react';
import { PengajianSchedule, AttendanceStatus } from '../../../types/attendance.types';
import { formatDateWIB } from '../../../utils/dateUtils';

interface JamaahRow {
  id: string;
  nama: string;
  jenisKelamin: 'Laki-laki' | 'Perempuan';
  status: AttendanceStatus;
  keterangan: string;
}

export const AttendanceListPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'jadwal' | 'input' | 'rekap'>('jadwal');
  
  // Schedules Sample Data
  const [schedules, setSchedules] = useState<PengajianSchedule[]>([
    {
      id: 'sch-001',
      namaPengajian: 'Pengajian Rutin Pekanan Malam Rabu',
      tanggal: '2026-11-10',
      waktu: '19:30',
      lokasi: 'Masjid Kelompok Kebon Kopi',
      deskripsi: 'Kajian rutin Al-Qur\'an dan hadits jamaah.',
      status: 'Terjadwal',
      totalHadir: 0,
      totalIzin: 0,
      totalSakit: 0,
      totalAlpa: 0,
      createdAt: '2026-11-05T08:00:00Z',
      createdBy: 'Ahmad Fauzi',
    },
    {
      id: 'sch-002',
      namaPengajian: 'Pengajian Rutin Pekanan Malam Ahad',
      tanggal: '2026-11-07',
      waktu: '19:30',
      lokasi: 'Sekretariat Kelompok Kebon Kopi',
      deskripsi: 'Pertemuan pengajian pekanan jamaah.',
      status: 'Selesai',
      totalHadir: 131,
      totalIzin: 5,
      totalSakit: 3,
      totalAlpa: 3,
      createdAt: '2026-11-02T08:00:00Z',
      createdBy: 'Ahmad Fauzi',
    },
  ]);

  // Selected schedule for input mode
  const [selectedSchedule, setSelectedSchedule] = useState<PengajianSchedule>(schedules[0]);
  
  // Attendance sheet rows
  const [attendanceRows, setAttendanceRows] = useState<JamaahRow[]>([
    { id: '1', nama: 'Ahmad Fauzi', jenisKelamin: 'Laki-laki', status: 'Hadir', keterangan: '' },
    { id: '2', nama: 'Siti Aminah', jenisKelamin: 'Perempuan', status: 'Hadir', keterangan: '' },
    { id: '3', nama: 'Abdullah Mansur', jenisKelamin: 'Laki-laki', status: 'Izin', keterangan: 'Tugas kerja' },
    { id: '4', nama: 'Nurul Hidayah', jenisKelamin: 'Perempuan', status: 'Hadir', keterangan: '' },
    { id: '5', nama: 'Muhammad Ridwan', jenisKelamin: 'Laki-laki', status: 'Sakit', keterangan: 'Demam' },
    { id: '6', nama: 'Fajar Nugroho', jenisKelamin: 'Laki-laki', status: 'Alpa', keterangan: '' },
  ]);

  // Modal create schedule
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newNama, setNewNama] = useState('');
  const [newTanggal, setNewTanggal] = useState('');
  const [newWaktu, setNewWaktu] = useState('19:30');
  const [newLokasi, setNewLokasi] = useState('Masjid Kelompok Kebon Kopi');
  const [newDeskripsi, setNewDeskripsi] = useState('');

  // Search & filter in attendance sheet
  const [sheetSearch, setSheetSearch] = useState('');
  const [sheetGender, setSheetGender] = useState<'Semua' | 'Laki-laki' | 'Perempuan'>('Semua');

  const filteredSheetRows = attendanceRows.filter((r) => {
    const matchesSearch = r.nama.toLowerCase().includes(sheetSearch.toLowerCase());
    const matchesGender = sheetGender === 'Semua' || r.jenisKelamin === sheetGender;
    return matchesSearch && matchesGender;
  });

  const handleMarkAllPresent = () => {
    setAttendanceRows(attendanceRows.map((r) => ({ ...r, status: 'Hadir' })));
  };

  const handleUpdateStatus = (id: string, newStatus: AttendanceStatus) => {
    setAttendanceRows(attendanceRows.map((r) => r.id === id ? { ...r, status: newStatus } : r));
  };

  const handleCreateSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNama || !newTanggal) return;

    const newSch: PengajianSchedule = {
      id: `sch-${Date.now().toString().slice(-4)}`,
      namaPengajian: newNama,
      tanggal: newTanggal,
      waktu: newWaktu,
      lokasi: newLokasi,
      deskripsi: newDeskripsi,
      status: 'Terjadwal',
      totalHadir: 0,
      totalIzin: 0,
      totalSakit: 0,
      totalAlpa: 0,
      createdAt: new Date().toISOString(),
      createdBy: 'Admin',
    };

    setSchedules([newSch, ...schedules]);
    setShowCreateModal(false);
    setNewNama('');
    setNewTanggal('');
  };

  // Real-time calculation statistics
  const countHadir = attendanceRows.filter((r) => r.status === 'Hadir').length;
  const countIzin = attendanceRows.filter((r) => r.status === 'Izin').length;
  const countSakit = attendanceRows.filter((r) => r.status === 'Sakit').length;
  const countAlpa = attendanceRows.filter((r) => r.status === 'Alpa').length;
  const totalDiikuti = attendanceRows.length;
  const persentase = totalDiikuti > 0 ? Math.round((countHadir / totalDiikuti) * 100) : 0;

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-xs">
        <div>
          <h1 className="text-2xl font-heading font-bold text-forest">
            Modul Absensi Pengajian
          </h1>
          <p className="text-xs text-ink-muted mt-0.5">
            Pengelolaan jadwal pertemuan rutin (2–4 kali sepekan) dan rekapitulasi kehadiran jamaah.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-forest hover:bg-forest-light shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Buat Jadwal Baru</span>
          </button>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center gap-2 border-b border-gray-200">
        {[
          { key: 'jadwal', label: 'Daftar Jadwal Pengajian' },
          { key: 'input', label: 'Lembar Input Kehadiran' },
          { key: 'rekap', label: 'Rekapitulasi & Formula Statistik' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-all ${
              activeTab === tab.key
                ? 'border-forest text-forest font-bold'
                : 'border-transparent text-ink-muted hover:text-ink'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: DAFTAR JADWAL PENGAJIAN */}
      {activeTab === 'jadwal' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {schedules.map((sch) => (
              <div key={sch.id} className="card-soft p-6 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-semibold ${
                      sch.status === 'Terjadwal' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}>
                      {sch.status}
                    </span>
                    <span className="text-xs text-ink-subtle">{formatDateWIB(sch.tanggal)}</span>
                  </div>

                  <h3 className="font-heading font-bold text-base text-forest">{sch.namaPengajian}</h3>
                  <p className="text-xs text-ink-muted line-clamp-2">{sch.deskripsi}</p>
                </div>

                <div className="space-y-2 pt-3 border-t border-gray-100 text-xs text-ink-subtle">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-olive shrink-0" />
                    <span>{sch.waktu} WIB</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-olive shrink-0" />
                    <span className="truncate">{sch.lokasi}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      setSelectedSchedule(sch);
                      setActiveTab('input');
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold text-forest bg-olive-50 hover:bg-olive-100 transition-colors"
                  >
                    <span>Input / Lihat Absensi</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: LEMBAR INPUT KEHADIRAN INTERAKTIF */}
      {activeTab === 'input' && (
        <div className="space-y-5">
          
          {/* Active Schedule Info & Stats Bar */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold text-olive uppercase tracking-wide">Kegiatan Aktif:</span>
              <h2 className="text-lg font-heading font-bold text-forest">{selectedSchedule.namaPengajian}</h2>
              <p className="text-xs text-ink-subtle">
                {formatDateWIB(selectedSchedule.tanggal)} • {selectedSchedule.waktu} WIB • {selectedSchedule.lokasi}
              </p>
            </div>

            {/* Quick Status Bar */}
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <div className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-100">
                Hadir: {countHadir}
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800 text-xs font-bold border border-amber-100">
                Izin: {countIzin}
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-800 text-xs font-bold border border-blue-100">
                Sakit: {countSakit}
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-rose-50 text-rose-800 text-xs font-bold border border-rose-100">
                Alpa: {countAlpa}
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-forest text-white text-xs font-bold">
                Kehadiran: {persentase}%
              </div>
            </div>
          </div>

          {/* Action & Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={handleMarkAllPresent}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
              >
                <CheckCheck className="w-4 h-4 text-emerald-600" />
                <span>Tandai Semua Hadir</span>
              </button>

              <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-xl border border-gray-200 text-xs">
                {(['Semua', 'Laki-laki', 'Perempuan'] as const).map((g) => (
                  <button
                    key={g}
                    onClick={() => setSheetGender(g)}
                    className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                      sheetGender === g ? 'bg-white text-forest shadow-xs' : 'text-ink-muted'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={sheetSearch}
                onChange={(e) => setSheetSearch(e.target.value)}
                placeholder="Cari nama di daftar absensi..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-olive"
              />
            </div>
          </div>

          {/* Table Attendance Sheet */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-canvas border-b border-gray-200/80 text-ink-muted uppercase font-bold text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3 px-4">No.</th>
                    <th className="py-3 px-4">Nama Jamaah</th>
                    <th className="py-3 px-4">Jenis Kelamin</th>
                    <th className="py-3 px-4 text-center">Status Kehadiran</th>
                    <th className="py-3 px-4">Keterangan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredSheetRows.map((row, idx) => (
                    <tr key={row.id} className="hover:bg-olive-50/20 transition-colors">
                      <td className="py-3 px-4 text-ink-subtle">{idx + 1}</td>
                      <td className="py-3 px-4 font-bold text-forest text-sm">{row.nama}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-semibold ${
                          row.jenisKelamin === 'Laki-laki' ? 'bg-blue-50 text-blue-700' : 'bg-rose-50 text-rose-700'
                        }`}>
                          {row.jenisKelamin}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="inline-flex items-center gap-1.5 bg-gray-50 p-1 rounded-xl border border-gray-200">
                          {(['Hadir', 'Izin', 'Sakit', 'Alpa'] as AttendanceStatus[]).map((st) => (
                            <button
                              key={st}
                              onClick={() => handleUpdateStatus(row.id, st)}
                              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                                row.status === st
                                  ? st === 'Hadir'
                                    ? 'bg-emerald-600 text-white shadow-xs'
                                    : st === 'Izin'
                                    ? 'bg-amber-500 text-white shadow-xs'
                                    : st === 'Sakit'
                                    ? 'bg-blue-500 text-white shadow-xs'
                                    : 'bg-rose-500 text-white shadow-xs'
                                  : 'text-ink-muted hover:bg-gray-200/60'
                              }`}
                            >
                              {st}
                            </button>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <input
                          type="text"
                          value={row.keterangan}
                          onChange={(e) => {
                            const val = e.target.value;
                            setAttendanceRows(attendanceRows.map((r) => r.id === row.id ? { ...r, keterangan: val } : r));
                          }}
                          placeholder="Catatan..."
                          className="px-2.5 py-1 text-xs bg-gray-50 border border-gray-200 rounded-lg w-full max-w-xs focus:outline-hidden focus:border-olive"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
              <span className="text-xs text-ink-subtle">
                Perubahan tersimpan otomatis dalam sesi kerja.
              </span>
              <button
                onClick={() => alert('Absensi pengajian berhasil disimpan secara permanen!')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-forest hover:bg-forest-light shadow-md transition-all"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Rekaman Absensi</span>
              </button>
            </div>
          </div>

        </div>
      )}

      {/* TAB 3: REKAPITULASI & FORMULA STATISTIK */}
      {activeTab === 'rekap' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-4">
            <h2 className="font-heading font-bold text-lg text-forest">
              Aturan & Rumus Perhitungan Kehadiran
            </h2>
            <div className="p-4 bg-beige-light border border-beige-dark/40 rounded-xl space-y-2 text-xs text-forest">
              <p className="font-bold">Formula Standar KK-DMS:</p>
              <p className="font-mono bg-white p-2 rounded border border-beige-dark/30 text-ink">
                Persentase Kehadiran = (Jumlah Hadir / Total Kegiatan yang Diikuti) × 100%
              </p>
              <ul className="list-disc list-inside space-y-1 text-ink-muted">
                <li>Izin, Sakit, dan Alpa <strong>tidak</strong> dihitung sebagai hadir.</li>
                <li>Jamaah yang belum aktif pada tanggal kegiatan <strong>tidak</strong> dihitung sebagai alpa.</li>
                <li>Kegiatan yang dibatalkan dikeluarkan dari denominator perhitungan.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Modal Create Schedule */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl animate-fadeIn">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-heading font-bold text-base text-forest">Buat Jadwal Pengajian Baru</h3>
              <button onClick={() => setShowCreateModal(false)} className="p-1 rounded-lg text-gray-400 hover:text-ink">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSchedule} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-ink">Nama Pengajian *</label>
                <input
                  type="text"
                  required
                  value={newNama}
                  onChange={(e) => setNewNama(e.target.value)}
                  placeholder="Contoh: Pengajian Rutin Malam Rabu"
                  className="w-full px-3.5 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-hidden focus:border-olive"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-ink">Tanggal *</label>
                  <input
                    type="date"
                    required
                    value={newTanggal}
                    onChange={(e) => setNewTanggal(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-hidden focus:border-olive"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-ink">Waktu (WIB) *</label>
                  <input
                    type="time"
                    required
                    value={newWaktu}
                    onChange={(e) => setNewWaktu(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-hidden focus:border-olive"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-ink">Lokasi Pertemuan</label>
                <input
                  type="text"
                  value={newLokasi}
                  onChange={(e) => setNewLokasi(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-hidden focus:border-olive"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-ink">Deskripsi Singkat</label>
                <textarea
                  rows={2}
                  value={newDeskripsi}
                  onChange={(e) => setNewDeskripsi(e.target.value)}
                  placeholder="Kajian Al-Qur'an dan Hadits..."
                  className="w-full px-3.5 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-hidden focus:border-olive"
                />
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-ink-muted hover:bg-gray-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-forest hover:bg-forest-light transition-colors"
                >
                  Buat Jadwal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

import React, { useState } from 'react';
import { 
  BarChart3, 
  FileSpreadsheet, 
  FileText, 
  Download, 
  Printer, 
  Filter, 
  Calendar, 
  CheckCircle2, 
  ShieldCheck,
  TrendingUp,
  Table
} from 'lucide-react';
import { formatDateWIB } from '../../../utils/dateUtils';

export const ReportsPage: React.FC = () => {
  const [selectedReportType, setSelectedReportType] = useState<string>('absensi');
  const [startDate, setStartDate] = useState('2026-10-01');
  const [endDate, setEndDate] = useState('2026-11-07');
  const [isExporting, setIsExporting] = useState(false);

  const reportTypes = [
    { id: 'absensi', name: 'Laporan Rekapitulasi Absensi Jamaah', desc: 'Kehadiran per kegiatan, perbandingan gender, persentase kehadiran' },
    { id: 'kegiatan', name: 'Laporan Kegiatan Pengajian', desc: 'Daftar pertemuan rutin mingguan dan jadwal terlaksana' },
    { id: 'jobdesk', name: 'Laporan Jobdesk Penerobos', desc: 'Status pekerjaan, evaluasi tugas per anggota dan seksi' },
    { id: 'musyawarah', name: 'Laporan Monitoring Hasil Musyawarah', desc: 'Ketercapaian keputusan, target deadline, catatan progres' },
    { id: 'ketercapaian', name: 'Laporan Ketercapaian Program Kerja', desc: 'Statistik agregat progres program aktif kelompok' },
    { id: 'aktivitas', name: 'Ringkasan Audit Aktivitas Sistem', desc: 'Riwayat perubahan data oleh pengurus dan admin' },
  ];

  const handleExportExcel = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert(`Laporan Excel (${selectedReportType.toUpperCase()}) berhasil disiapkan untuk diunduh.`);
    }, 700);
  };

  const handleExportPDF = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      window.print();
    }, 500);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-xs">
        <div>
          <h1 className="text-2xl font-heading font-bold text-forest">
            Pusat Laporan & Statistik
          </h1>
          <p className="text-xs text-ink-muted mt-0.5">
            Ekspor laporan resmi berkala dalam format Excel (.xlsx) dan PDF siap cetak berstandar organisasi.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportExcel}
            disabled={isExporting}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>Unduh Excel (.xlsx)</span>
          </button>

          <button
            onClick={handleExportPDF}
            disabled={isExporting}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-forest hover:bg-forest-light shadow-xs transition-colors"
          >
            <Printer className="w-4 h-4 text-olive-light" />
            <span>Cetak / Simpan PDF</span>
          </button>
        </div>
      </div>

      {/* Filter Period and Report Type Selection */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Report Types Selector */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-4">
          <h2 className="font-heading font-bold text-base text-forest border-b border-gray-100 pb-3">
            Pilih Jenis Laporan
          </h2>

          <div className="space-y-2">
            {reportTypes.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedReportType(t.id)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                  selectedReportType === t.id
                    ? 'bg-olive-50 border-forest text-forest shadow-xs'
                    : 'bg-white border-gray-100 hover:border-gray-200 text-ink'
                }`}
              >
                <p className="text-xs font-bold">{t.name}</p>
                <p className="text-[11px] text-ink-subtle mt-0.5">{t.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Period Filter & Live Report Document Preview */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Period Filter Card */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-4">
            <h2 className="font-heading font-bold text-base text-forest">
              Filter Rentang Periode
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-ink">Tanggal Awal (DD/MM/YYYY)</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-hidden focus:border-olive"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-ink">Tanggal Akhir (DD/MM/YYYY)</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-hidden focus:border-olive"
                />
              </div>
            </div>
          </div>

          {/* Document Preview (Official Print-Ready Template) */}
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6 print:border-none print:shadow-none">
            
            {/* Kop Resmi Surat / Dokumen */}
            <div className="border-b-2 border-forest pb-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img 
                  src="./logo-placeholder.svg" 
                  alt="Logo Kelompok Kebon Kopi" 
                  className="w-14 h-14 object-contain"
                />
                <div>
                  <h3 className="font-heading font-bold text-lg text-forest tracking-tight leading-tight">
                    KELOMPOK KEBON KOPI
                  </h3>
                  <p className="text-xs font-medium text-olive-dark">
                    Sistem Informasi & Manajemen Digital (KK-DMS)
                  </p>
                  <p className="text-[10px] text-ink-subtle">
                    Zona Waktu Resmi: Asia/Jakarta (WIB) • Tanggal Dokumen: {formatDateWIB(new Date())}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold uppercase tracking-wider text-forest px-2.5 py-1 bg-olive-50 rounded border border-olive-200">
                  Dokumen Resmi
                </span>
              </div>
            </div>

            {/* Judul Laporan & Periode */}
            <div className="text-center space-y-1 py-2">
              <h4 className="font-heading font-bold text-base text-forest uppercase tracking-wide">
                {reportTypes.find((r) => r.id === selectedReportType)?.name}
              </h4>
              <p className="text-xs text-ink-subtle">
                Periode Laporan: <strong>{formatDateWIB(startDate)}</strong> s/d <strong>{formatDateWIB(endDate)}</strong>
              </p>
            </div>

            {/* Ringkasan Statistik */}
            <div className="grid grid-cols-3 gap-3 p-3 bg-canvas rounded-xl text-center border border-gray-100">
              <div>
                <p className="text-[10px] text-ink-subtle">Total Jamaah Terdaftar</p>
                <p className="text-base font-bold text-forest">142 Jamaah</p>
              </div>
              <div>
                <p className="text-[10px] text-ink-subtle">Rata-Rata Kehadiran</p>
                <p className="text-base font-bold text-emerald-700">88.5%</p>
              </div>
              <div>
                <p className="text-[10px] text-ink-subtle">Ketercapaian Program</p>
                <p className="text-base font-bold text-forest">78.5%</p>
              </div>
            </div>

            {/* Sample Table in Document */}
            <div className="border border-gray-200 rounded-lg overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-200 font-bold text-ink-muted">
                  <tr>
                    <th className="py-2 px-3">No.</th>
                    <th className="py-2 px-3">Indikator Kegiatan</th>
                    <th className="py-2 px-3">Realisasi</th>
                    <th className="py-2 px-3">Target</th>
                    <th className="py-2 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-2 px-3">1</td>
                    <td className="py-2 px-3 font-medium">Pertemuan Pengajian Pekanan</td>
                    <td className="py-2 px-3">8 Kali</td>
                    <td className="py-2 px-3">8 Kali</td>
                    <td className="py-2 px-3 text-emerald-700 font-bold">100% Tercapai</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3">2</td>
                    <td className="py-2 px-3 font-medium">Rata-Rata Jamaah Hadir</td>
                    <td className="py-2 px-3">126 Orang</td>
                    <td className="py-2 px-3">120 Orang</td>
                    <td className="py-2 px-3 text-emerald-700 font-bold">Melampaui Target</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3">3</td>
                    <td className="py-2 px-3 font-medium">Tindak Lanjut Hasil Musyawarah</td>
                    <td className="py-2 px-3">12 Keputusan</td>
                    <td className="py-2 px-3">14 Keputusan</td>
                    <td className="py-2 px-3 text-amber-700 font-bold">Sedang Berjalan</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Tanda Tangan Pengurus */}
            <div className="pt-8 grid grid-cols-2 text-center text-xs text-ink-muted">
              <div className="space-y-12">
                <p>Mengetahui,<br /><strong>Ketua Kelompok Kebon Kopi</strong></p>
                <p className="font-bold text-ink underline">( ............................................ )</p>
              </div>
              <div className="space-y-12">
                <p>Penanggung Jawab Laporan,<br /><strong>Sekretariat KK-DMS</strong></p>
                <p className="font-bold text-ink underline">( ............................................ )</p>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

import React, { useState } from 'react';
import { 
  Scale, 
  Search, 
  Filter, 
  Plus, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  FileText, 
  TrendingUp, 
  Calendar, 
  User, 
  X,
  Edit,
  Upload
} from 'lucide-react';
import { MusyawarahDecision, MusyawarahStatus } from '../../../types/musyawarah.types';
import { formatDateWIB } from '../../../utils/dateUtils';

export const MusyawarahListPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('Semua');

  const [decisions, setDecisions] = useState<MusyawarahDecision[]>([
    {
      id: 'msy-001',
      judulKeputusan: 'Pengadaan Sound System & Perlengkapan Pengajian',
      deskripsi: 'Pembelian sound system baru berkualitas untuk mendukung kekhusyukan kajian rutin pekanan.',
      tanggalMusyawarah: '2026-10-05',
      penanggungJawab: 'Muhammad Ridwan',
      targetPenyelesaian: '2026-10-30',
      persentaseProgres: 100,
      status: 'Selesai',
      catatanPerkembangan: 'Alat telah tiba dan berhasil dipasang serta diuji coba.',
      isArchived: false,
      createdAt: '2026-10-05T09:00:00Z',
      updatedAt: '2026-10-30T10:00:00Z',
      createdBy: 'Ahmad Fauzi',
    },
    {
      id: 'msy-002',
      judulKeputusan: 'Renovasi Ringan & Pengecatan Sekretariat Kelompok',
      deskripsi: 'Perbaikan plafon dan pengecatan dinding sekretariat untuk kenyamanan jamaah.',
      tanggalMusyawarah: '2026-10-15',
      penanggungJawab: 'Abdullah Mansur',
      targetPenyelesaian: '2026-11-20',
      persentaseProgres: 75,
      status: 'Sedang Berjalan',
      catatanPerkembangan: 'Pengecatan interior 80% selesai, tinggal pembersihan akhir.',
      isArchived: false,
      createdAt: '2026-10-15T09:00:00Z',
      updatedAt: '2026-11-05T10:00:00Z',
      createdBy: 'Ahmad Fauzi',
    },
    {
      id: 'msy-003',
      judulKeputusan: 'Digitalisasi Database Jamaah & Absensi KK-DMS',
      deskripsi: 'Pengembangan sistem informasi terpusat berbasis web untuk Kelompok Kebon Kopi.',
      tanggalMusyawarah: '2026-10-20',
      penanggungJawab: 'Ahmad Fauzi',
      targetPenyelesaian: '2026-11-25',
      persentaseProgres: 85,
      status: 'Sedang Berjalan',
      catatanPerkembangan: 'Frontend dan database Firestore telah selesai dirancang.',
      isArchived: false,
      createdAt: '2026-10-20T09:00:00Z',
      updatedAt: '2026-11-07T10:00:00Z',
      createdBy: 'Ahmad Fauzi',
    },
    {
      id: 'msy-004',
      judulKeputusan: 'Penyusunan Jadwal Kajian Tematik Remaja',
      deskripsi: 'Program pembinaan khusus untuk generasi penerus.',
      tanggalMusyawarah: '2026-11-01',
      penanggungJawab: 'Fajar Nugroho',
      targetPenyelesaian: '2026-11-30',
      persentaseProgres: 20,
      status: 'Belum Dilaksanakan',
      isArchived: false,
      createdAt: '2026-11-01T09:00:00Z',
      updatedAt: '2026-11-01T09:00:00Z',
      createdBy: 'Ahmad Fauzi',
    },
    {
      id: 'msy-005',
      judulKeputusan: 'Rencana Rihlah / Silaturahim Luar Kota',
      deskripsi: 'Dibatalkan dan digantikan dengan silaturahim di lingkungan sekretariat.',
      tanggalMusyawarah: '2026-09-15',
      penanggungJawab: 'Pengurus',
      targetPenyelesaian: '2026-10-15',
      persentaseProgres: 0,
      status: 'Tidak Dilanjutkan',
      isArchived: false,
      createdAt: '2026-09-15T09:00:00Z',
      updatedAt: '2026-10-01T09:00:00Z',
      createdBy: 'Ahmad Fauzi',
    },
  ]);

  // Modal create
  const [showAddModal, setShowAddModal] = useState(false);
  const [formJudul, setFormJudul] = useState('');
  const [formDeskripsi, setFormDeskripsi] = useState('');
  const [formPJ, setFormPJ] = useState('');
  const [formDeadline, setFormDeadline] = useState('');

  // Modal update progress
  const [updatingDecision, setUpdatingDecision] = useState<MusyawarahDecision | null>(null);
  const [newProgress, setNewProgress] = useState(0);
  const [newStatus, setNewStatus] = useState<MusyawarahStatus>('Sedang Berjalan');
  const [newNote, setNewNote] = useState('');

  // Calculations: Active programs exclude 'Tidak Dilanjutkan'
  const activePrograms = decisions.filter((d) => d.status !== 'Tidak Dilanjutkan');
  const totalAktif = activePrograms.length;
  const countSelesai = activePrograms.filter((d) => d.status === 'Selesai').length;
  const countBerjalan = activePrograms.filter((d) => d.status === 'Sedang Berjalan').length;
  const countBelum = activePrograms.filter((d) => d.status === 'Belum Dilaksanakan').length;
  const countTertunda = activePrograms.filter((d) => d.status === 'Tertunda').length;

  const sumProgres = activePrograms.reduce((acc, curr) => acc + curr.persentaseProgres, 0);
  const rataRataKetercapaian = totalAktif > 0 ? Math.round(sumProgres / totalAktif) : 0;

  const filteredDecisions = decisions.filter((d) => {
    const matchesSearch = d.judulKeputusan.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          d.penanggungJawab.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'Semua' || d.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleSaveNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formJudul || !formPJ) return;

    const newDec: MusyawarahDecision = {
      id: `msy-${Date.now().toString().slice(-4)}`,
      judulKeputusan: formJudul,
      deskripsi: formDeskripsi,
      tanggalMusyawarah: new Date().toISOString().slice(0, 10),
      penanggungJawab: formPJ,
      targetPenyelesaian: formDeadline,
      persentaseProgres: 0,
      status: 'Belum Dilaksanakan',
      isArchived: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'Admin',
    };

    setDecisions([newDec, ...decisions]);
    setShowAddModal(false);
    setFormJudul('');
    setFormDeskripsi('');
    setFormPJ('');
  };

  const handleSaveProgress = () => {
    if (!updatingDecision) return;
    setDecisions(decisions.map((d) => {
      if (d.id === updatingDecision.id) {
        return {
          ...d,
          persentaseProgres: newProgress,
          status: newStatus,
          catatanPerkembangan: newNote || d.catatanPerkembangan,
          updatedAt: new Date().toISOString(),
        };
      }
      return d;
    }));
    setUpdatingDecision(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-xs">
        <div>
          <h1 className="text-2xl font-heading font-bold text-forest">
            Monitoring Hasil Musyawarah
          </h1>
          <p className="text-xs text-ink-muted mt-0.5">
            Pelacakan tindak lanjut keputusan musyawarah, persentase progres, dan bukti pelaksanaan program.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-forest hover:bg-forest-light shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Keputusan</span>
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <div className="p-4 rounded-xl bg-white border border-gray-100 shadow-xs text-center">
          <span className="text-[11px] text-ink-subtle">Total Keputusan</span>
          <p className="text-xl font-heading font-bold text-forest mt-1">{decisions.length}</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-gray-100 shadow-xs text-center">
          <span className="text-[11px] text-emerald-800">Selesai</span>
          <p className="text-xl font-heading font-bold text-emerald-700 mt-1">{countSelesai}</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-gray-100 shadow-xs text-center">
          <span className="text-[11px] text-amber-800">Sedang Berjalan</span>
          <p className="text-xl font-heading font-bold text-amber-600 mt-1">{countBerjalan}</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-gray-100 shadow-xs text-center">
          <span className="text-[11px] text-ink-subtle">Belum Terlaksana</span>
          <p className="text-xl font-heading font-bold text-ink mt-1">{countBelum}</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-gray-100 shadow-xs text-center">
          <span className="text-[11px] text-rose-800">Tertunda</span>
          <p className="text-xl font-heading font-bold text-rose-600 mt-1">{countTertunda}</p>
        </div>

        <div className="p-4 rounded-xl bg-olive-50 border border-olive-200 shadow-xs text-center">
          <span className="text-[11px] text-olive-dark font-semibold">Ketercapaian Aktif</span>
          <p className="text-xl font-heading font-bold text-forest mt-1">{rataRataKetercapaian}%</p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari keputusan atau penanggung jawab..."
            className="w-full pl-10 pr-4 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-olive focus:border-transparent"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {['Semua', 'Sedang Berjalan', 'Selesai', 'Belum Dilaksanakan', 'Tertunda', 'Tidak Dilanjutkan'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                filterStatus === st ? 'bg-forest text-white shadow-xs' : 'bg-gray-50 text-ink-muted hover:bg-gray-100'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Decisions List Cards */}
      <div className="space-y-4">
        {filteredDecisions.map((dec) => (
          <div key={dec.id} className="card-soft p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-ink-subtle">{dec.id}</span>
                  <span className="text-xs text-ink-subtle">• Musyawarah: {formatDateWIB(dec.tanggalMusyawarah)}</span>
                </div>
                <h3 className="font-heading font-bold text-lg text-forest">{dec.judulKeputusan}</h3>
              </div>

              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${
                  dec.status === 'Selesai' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
                  dec.status === 'Sedang Berjalan' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                  dec.status === 'Tidak Dilanjutkan' ? 'bg-gray-100 text-gray-500 line-through' :
                  'bg-rose-50 text-rose-800 border border-rose-200'
                }`}>
                  {dec.status}
                </span>

                <button
                  onClick={() => {
                    setUpdatingDecision(dec);
                    setNewProgress(dec.persentaseProgres);
                    setNewStatus(dec.status);
                    setNewNote(dec.catatanPerkembangan || '');
                  }}
                  className="px-3 py-1 rounded-lg text-xs font-semibold text-forest bg-olive-50 hover:bg-olive-100 transition-colors"
                >
                  Update Progres
                </button>
              </div>
            </div>

            <p className="text-xs text-ink-muted leading-relaxed">
              {dec.deskripsi}
            </p>

            {/* Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-ink">Tingkat Progres Pelaksanaan</span>
                <span className="font-bold text-forest">{dec.persentaseProgres}%</span>
              </div>
              <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    dec.persentaseProgres === 100 ? 'bg-emerald-600' : 'bg-olive'
                  }`}
                  style={{ width: `${dec.persentaseProgres}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-ink-subtle border-t border-gray-100">
              <div className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-olive shrink-0" />
                <span>PJ: <strong className="text-ink">{dec.penanggungJawab}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-olive shrink-0" />
                <span>Target: <strong className="text-ink">{formatDateWIB(dec.targetPenyelesaian)}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-olive shrink-0" />
                <span>Update: {formatDateWIB(dec.updatedAt)}</span>
              </div>
            </div>

            {dec.catatanPerkembangan && (
              <div className="p-3 bg-beige-light border border-beige-dark/30 rounded-xl text-xs space-y-0.5 text-forest">
                <span className="font-bold">Catatan Perkembangan Terakhir:</span>
                <p className="text-ink-muted">{dec.catatanPerkembangan}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal Update Progress */}
      {updatingDecision && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl animate-fadeIn">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-heading font-bold text-base text-forest">Update Progres Musyawarah</h3>
              <button onClick={() => setUpdatingDecision(null)} className="p-1 rounded-lg text-gray-400 hover:text-ink">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <p className="font-bold text-forest text-sm">{updatingDecision.judulKeputusan}</p>
                <p className="text-ink-subtle">Penanggung jawab: {updatingDecision.penanggungJawab}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="font-semibold text-ink">Persentase Progres: {newProgress}%</label>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={newProgress}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setNewProgress(val);
                    if (val === 100) setNewStatus('Selesai');
                    else if (val > 0 && newStatus === 'Belum Dilaksanakan') setNewStatus('Sedang Berjalan');
                  }}
                  className="w-full accent-forest cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-ink">Status Keputusan</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as MusyawarahStatus)}
                  className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-hidden focus:border-olive"
                >
                  <option>Belum Dilaksanakan</option>
                  <option>Sedang Berjalan</option>
                  <option>Selesai</option>
                  <option>Tertunda</option>
                  <option>Tidak Dilanjutkan</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-ink">Catatan Perkembangan</label>
                <textarea
                  rows={3}
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Deskripsikan capaian atau kendala yang dihadapi..."
                  className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-hidden focus:border-olive"
                />
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setUpdatingDecision(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-ink-muted hover:bg-gray-100"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleSaveProgress}
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-forest hover:bg-forest-light transition-colors"
                >
                  Simpan Perubahan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Add New */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl animate-fadeIn">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-heading font-bold text-base text-forest">Tambah Keputusan Musyawarah</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 rounded-lg text-gray-400 hover:text-ink">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveNew} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-ink">Judul Keputusan *</label>
                <input
                  type="text"
                  required
                  value={formJudul}
                  onChange={(e) => setFormJudul(e.target.value)}
                  placeholder="Contoh: Pengadaan Sound System"
                  className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-hidden focus:border-olive"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-ink">Deskripsi Detail</label>
                <textarea
                  rows={2}
                  value={formDeskripsi}
                  onChange={(e) => setFormDeskripsi(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-hidden focus:border-olive"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-ink">Penanggung Jawab *</label>
                  <input
                    type="text"
                    required
                    value={formPJ}
                    onChange={(e) => setFormPJ(e.target.value)}
                    placeholder="Nama anggota"
                    className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-hidden focus:border-olive"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-ink">Target Penyelesaian</label>
                  <input
                    type="date"
                    value={formDeadline}
                    onChange={(e) => setFormDeadline(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-hidden focus:border-olive"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-ink-muted hover:bg-gray-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-forest hover:bg-forest-light transition-colors"
                >
                  Simpan Keputusan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

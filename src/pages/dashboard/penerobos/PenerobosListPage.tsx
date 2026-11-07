import React, { useState } from 'react';
import { 
  Briefcase, 
  Search, 
  Filter, 
  Plus, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  FileText, 
  Download, 
  Edit, 
  Eye, 
  X,
  FileCheck,
  ChevronRight
} from 'lucide-react';
import { PenerobosJobdesk, PenerobosStatus } from '../../../types/penerobos.types';
import { formatDateWIB } from '../../../utils/dateUtils';

export const PenerobosListPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('Semua');

  const [jobdesks, setJobdesks] = useState<PenerobosJobdesk[]>([
    {
      id: 'pnb-001',
      namaAnggota: 'Ahmad Fauzi',
      jabatan: 'Koordinator Umum',
      deskripsiJobdesk: 'Memastikan koordinasi antar seksi berjalan lancar dan melaporkan agenda musyawarah.',
      tanggungJawab: 'Supervisi kegiatan pengajian dan musyawarah kerja bulanan.',
      targetPekerjaan: '100% program berjalan sesuai timeline.',
      status: 'Sedang Dikerjakan',
      catatanEvaluasi: 'Koordinasi berjalan sangat baik, perlu peningkatan komunikasi via grup pengurus.',
      isArchived: false,
      createdAt: '2026-10-01T08:00:00Z',
      updatedAt: '2026-10-25T08:00:00Z',
      createdBy: 'Super Admin',
    },
    {
      id: 'pnb-002',
      namaAnggota: 'Muhammad Ridwan',
      jabatan: 'Seksi Tempat & Logistik',
      deskripsiJobdesk: 'Persiapan sarana prasarana pengajian, sound system, dan kebersihan tempat.',
      tanggungJawab: 'Kesiapan tempat minimal 30 menit sebelum jadwal pengajian.',
      targetPekerjaan: 'Seluruh perlengkapan berfungsi optimal tanpa kendala teknis.',
      status: 'Selesai',
      catatanEvaluasi: 'Logistik sound system baru telah terpasang dengan baik.',
      isArchived: false,
      createdAt: '2026-10-01T08:00:00Z',
      updatedAt: '2026-11-02T08:00:00Z',
      createdBy: 'Super Admin',
    },
    {
      id: 'pnb-003',
      namaAnggota: 'Abdullah Mansur',
      jabatan: 'Seksi Konsumsi & Jamuan',
      deskripsiJobdesk: 'Koordinasi penyediaan konsumsi ringan pengajian rutin dan jamuan musyawarah.',
      tanggungJawab: 'Pengaturan menu yang sehat dan efisiensi anggaran jamuan.',
      targetPekerjaan: 'Tersedia tepat waktu pada setiap pertemuan.',
      status: 'Sedang Dikerjakan',
      isArchived: false,
      createdAt: '2026-10-01T08:00:00Z',
      updatedAt: '2026-10-20T08:00:00Z',
      createdBy: 'Super Admin',
    },
    {
      id: 'pnb-004',
      namaAnggota: 'Fajar Nugroho',
      jabatan: 'Seksi Keamanan & Parkir',
      deskripsiJobdesk: 'Pengaturan parkir kendaraan jamaah dan kenyamanan lingkungan sekitar.',
      tanggungJawab: 'Kendaraan tertata rapi dan tidak mengganggu jalan umum.',
      targetPekerjaan: 'Nol insiden keamanan selama kegiatan berlangsung.',
      status: 'Belum Dimulai',
      isArchived: false,
      createdAt: '2026-10-05T08:00:00Z',
      updatedAt: '2026-10-05T08:00:00Z',
      createdBy: 'Super Admin',
    },
  ]);

  const [selectedJobdesk, setSelectedJobdesk] = useState<PenerobosJobdesk | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states
  const [formNama, setFormNama] = useState('');
  const [formJabatan, setFormJabatan] = useState('');
  const [formDeskripsi, setFormDeskripsi] = useState('');
  const [formTanggungJawab, setFormTanggungJawab] = useState('');
  const [formTarget, setFormTarget] = useState('');
  const [formStatus, setFormStatus] = useState<PenerobosStatus>('Belum Dimulai');

  const filteredList = jobdesks.filter((item) => {
    const matchesSearch = item.namaAnggota.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.jabatan.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'Semua' || item.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formNama || !formJabatan) return;

    const newItem: PenerobosJobdesk = {
      id: `pnb-${Date.now().toString().slice(-4)}`,
      namaAnggota: formNama,
      jabatan: formJabatan,
      deskripsiJobdesk: formDeskripsi,
      tanggungJawab: formTanggungJawab,
      targetPekerjaan: formTarget,
      status: formStatus,
      isArchived: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'Admin',
    };

    setJobdesks([newItem, ...jobdesks]);
    setShowAddModal(false);
    setFormNama('');
    setFormJabatan('');
    setFormDeskripsi('');
  };

  const getStatusBadge = (status: PenerobosStatus) => {
    switch (status) {
      case 'Selesai':
        return <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">Selesai</span>;
      case 'Sedang Dikerjakan':
        return <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">Sedang Dikerjakan</span>;
      case 'Perlu Evaluasi':
        return <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-purple-50 text-purple-800 border border-purple-200">Perlu Evaluasi</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-gray-100 text-gray-700 border border-gray-200">Belum Dimulai</span>;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-xs">
        <div>
          <h1 className="text-2xl font-heading font-bold text-forest">
            Manajemen Jobdesk Penerobos
          </h1>
          <p className="text-xs text-ink-muted mt-0.5">
            Pengelolaan pembagian tugas resmi, target pekerjaan, evaluasi, dan lampiran dokumen.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-forest hover:bg-forest-light shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Jobdesk</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama anggota atau jabatan..."
            className="w-full pl-10 pr-4 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-olive focus:border-transparent"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {['Semua', 'Belum Dimulai', 'Sedang Dikerjakan', 'Selesai', 'Perlu Evaluasi'].map((st) => (
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

      {/* Responsive Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredList.map((job) => (
          <div key={job.id} className="card-soft p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-ink-subtle">{job.id}</span>
                {getStatusBadge(job.status)}
              </div>

              <div>
                <h3 className="font-heading font-bold text-lg text-forest">{job.namaAnggota}</h3>
                <p className="text-xs font-semibold text-olive-dark">{job.jabatan}</p>
              </div>

              <p className="text-xs text-ink-muted leading-relaxed line-clamp-2">
                {job.deskripsiJobdesk}
              </p>

              <div className="p-3 bg-canvas rounded-xl text-xs space-y-1 border border-gray-100">
                <p className="font-semibold text-forest">Target Pekerjaan:</p>
                <p className="text-ink-muted">{job.targetPekerjaan}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[11px] text-ink-subtle">Update: {formatDateWIB(job.updatedAt)}</span>
              <button
                onClick={() => setSelectedJobdesk(job)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-forest bg-olive-50 hover:bg-olive-100 transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Detail & Evaluasi</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedJobdesk && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-xl animate-fadeIn">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="font-heading font-bold text-base text-forest">{selectedJobdesk.namaAnggota}</h3>
                <p className="text-xs text-olive-dark font-medium">{selectedJobdesk.jabatan}</p>
              </div>
              <button onClick={() => setSelectedJobdesk(null)} className="p-1 rounded-lg text-gray-400 hover:text-ink">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="font-semibold text-ink-subtle">Deskripsi Tugas:</span>
                <p className="text-ink mt-0.5 leading-relaxed">{selectedJobdesk.deskripsiJobdesk}</p>
              </div>

              <div>
                <span className="font-semibold text-ink-subtle">Tanggung Jawab:</span>
                <p className="text-ink mt-0.5 leading-relaxed">{selectedJobdesk.tanggungJawab}</p>
              </div>

              <div>
                <span className="font-semibold text-ink-subtle">Target Pekerjaan:</span>
                <p className="text-ink mt-0.5 leading-relaxed">{selectedJobdesk.targetPekerjaan}</p>
              </div>

              {selectedJobdesk.catatanEvaluasi && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl space-y-1">
                  <span className="font-bold text-amber-800">Catatan Evaluasi Pengurus:</span>
                  <p className="text-amber-900">{selectedJobdesk.catatanEvaluasi}</p>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-end">
              <button
                onClick={() => setSelectedJobdesk(null)}
                className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-forest hover:bg-forest-light transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl animate-fadeIn">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-heading font-bold text-base text-forest">Tambah Jobdesk Baru</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 rounded-lg text-gray-400 hover:text-ink">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-ink">Nama Anggota *</label>
                <input
                  type="text"
                  required
                  value={formNama}
                  onChange={(e) => setFormNama(e.target.value)}
                  placeholder="Contoh: Ridwan Kamil"
                  className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-hidden focus:border-olive"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-ink">Jabatan / Posisi *</label>
                <input
                  type="text"
                  required
                  value={formJabatan}
                  onChange={(e) => setFormJabatan(e.target.value)}
                  placeholder="Contoh: Koordinator Logistik"
                  className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-hidden focus:border-olive"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-ink">Deskripsi Tugas</label>
                <textarea
                  rows={2}
                  value={formDeskripsi}
                  onChange={(e) => setFormDeskripsi(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-hidden focus:border-olive"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-ink">Target Pekerjaan</label>
                <input
                  type="text"
                  value={formTarget}
                  onChange={(e) => setFormTarget(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-hidden focus:border-olive"
                />
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
                  Simpan Jobdesk
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

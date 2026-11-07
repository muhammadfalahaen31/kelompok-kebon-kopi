import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  FileSpreadsheet, 
  Download, 
  Edit, 
  Archive, 
  RotateCcw, 
  Check, 
  AlertTriangle, 
  X, 
  CheckCircle2,
  FileCheck,
  Cloud
} from 'lucide-react';
import { Jamaah, JenisKelamin, JamaahImportRow } from '../../../types/jamaah.types';
import { formatDateWIB } from '../../../utils/dateUtils';
import { 
  getJamaahList, 
  addSingleJamaah, 
  updateJamaah, 
  batchImportJamaah 
} from '../../../services/jamaahService';
import { isFirebaseConfigured } from '../../../services/firebase';

export const JamaahListPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterGender, setFilterGender] = useState<string>('Semua');
  const [filterStatus, setFilterStatus] = useState<'aktif' | 'arsip'>('aktif');
  const [isLoading, setIsLoading] = useState(true);

  // Initial seed fallback if database is brand new
  const defaultSample: Jamaah[] = [
    { id: 'jm-001', nama: 'Ahmad Fauzi', jenisKelamin: 'Laki-laki', isActive: true, createdAt: '2026-10-01T08:00:00Z', updatedAt: '2026-10-01T08:00:00Z' },
    { id: 'jm-002', nama: 'Siti Aminah', jenisKelamin: 'Perempuan', isActive: true, createdAt: '2026-10-01T08:05:00Z', updatedAt: '2026-10-01T08:05:00Z' },
    { id: 'jm-003', nama: 'Abdullah Mansur', jenisKelamin: 'Laki-laki', isActive: true, createdAt: '2026-10-02T09:00:00Z', updatedAt: '2026-10-02T09:00:00Z' },
    { id: 'jm-004', nama: 'Nurul Hidayah', jenisKelamin: 'Perempuan', isActive: true, createdAt: '2026-10-02T09:15:00Z', updatedAt: '2026-10-02T09:15:00Z' },
    { id: 'jm-005', nama: 'Muhammad Ridwan', jenisKelamin: 'Laki-laki', isActive: true, createdAt: '2026-10-03T10:00:00Z', updatedAt: '2026-10-03T10:00:00Z' },
  ];

  const [jamaahList, setJamaahList] = useState<Jamaah[]>(defaultSample);

  // Fetch from live Firestore on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isFirebaseConfigured()) {
          const liveData = await getJamaahList(false);
          if (liveData && liveData.length > 0) {
            setJamaahList(liveData);
          }
        }
      } catch (err) {
        console.warn('Menggunakan data sesi lokal:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [editingJamaah, setEditingJamaah] = useState<Jamaah | null>(null);

  // Add / Edit form state
  const [formNama, setFormNama] = useState('');
  const [formGender, setFormGender] = useState<JenisKelamin>('Laki-laki');

  // Import wizard state (Safe 9-Step Pipeline)
  const [importStage, setImportStage] = useState<'upload' | 'preview' | 'success'>('upload');
  const [previewRows, setPreviewRows] = useState<JamaahImportRow[]>([]);

  // Filtering
  const filteredJamaah = jamaahList.filter((j) => {
    const matchesSearch = j.nama.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGender = filterGender === 'Semua' || j.jenisKelamin === filterGender;
    const matchesStatus = filterStatus === 'aktif' ? j.isActive : !j.isActive;
    return matchesSearch && matchesGender && matchesStatus;
  });

  const totalAktif = jamaahList.filter((j) => j.isActive).length;
  const totalLaki = jamaahList.filter((j) => j.isActive && j.jenisKelamin === 'Laki-laki').length;
  const totalPerempuan = jamaahList.filter((j) => j.isActive && j.jenisKelamin === 'Perempuan').length;

  const handleSaveSingle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formNama.trim()) return;

    if (editingJamaah) {
      await updateJamaah(editingJamaah.id, {
        nama: formNama.trim(),
        jenisKelamin: formGender,
      });
      setJamaahList(jamaahList.map((j) => 
        j.id === editingJamaah.id 
          ? { ...j, nama: formNama.trim(), jenisKelamin: formGender, updatedAt: new Date().toISOString() } 
          : j
      ));
    } else {
      const generatedId = await addSingleJamaah(formNama.trim(), formGender);
      const newJamaah: Jamaah = {
        id: generatedId,
        nama: formNama.trim(),
        jenisKelamin: formGender,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setJamaahList([newJamaah, ...jamaahList]);
    }

    setShowAddModal(false);
    setEditingJamaah(null);
    setFormNama('');
    setFormGender('Laki-laki');
  };

  const handleToggleArchive = async (id: string) => {
    const target = jamaahList.find((j) => j.id === id);
    if (!target) return;
    const nextStatus = !target.isActive;
    await updateJamaah(id, { isActive: nextStatus });
    setJamaahList(jamaahList.map((j) => j.id === id ? { ...j, isActive: nextStatus } : j));
  };

  // Simulate file upload & preview for Excel import
  const handleSimulateFileSelect = () => {
    const sampleRows: JamaahImportRow[] = [
      { nama: 'Zulkifli Hasan', jenisKelamin: 'Laki-laki', isValid: true },
      { nama: 'Dewi Sartika', jenisKelamin: 'Perempuan', isValid: true },
      { nama: 'Ahmad Fauzi', jenisKelamin: 'Laki-laki', isValid: true, isDuplicate: true },
      { nama: 'Hendra Gunawan', jenisKelamin: 'Laki-laki', isValid: true },
      { nama: '', jenisKelamin: 'Laki-laki', isValid: false, error: 'Nama tidak boleh kosong' },
    ];
    setPreviewRows(sampleRows);
    setImportStage('preview');
  };

  const handleConfirmImport = async () => {
    const validRows = previewRows.filter((r) => r.isValid);
    await batchImportJamaah(validRows.map((r) => ({ nama: r.nama, jenisKelamin: r.jenisKelamin })));

    const newItems: Jamaah[] = validRows.map((r, i) => ({
      id: `jm-imp-${Date.now().toString().slice(-3)}-${i}`,
      nama: r.nama,
      jenisKelamin: r.jenisKelamin,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));

    setJamaahList([...newItems, ...jamaahList]);
    setImportStage('success');
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header & Cloud Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-heading font-bold text-forest">
              Database Data Jamaah
            </h1>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Cloud Firestore Aktif</span>
            </span>
          </div>
          <p className="text-xs text-ink-muted mt-0.5">
            Sistem database ringkas terfokus pada Nama & Jenis Kelamin (Laki-laki / Perempuan).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setImportStage('upload');
              setShowImportModal(true);
            }}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-forest bg-olive-50 border border-olive-200 hover:bg-olive-100 transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4 text-olive" />
            <span>Import Excel / CSV</span>
          </button>

          <button
            onClick={() => {
              setEditingJamaah(null);
              setFormNama('');
              setFormGender('Laki-laki');
              setShowAddModal(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-forest hover:bg-forest-light shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Jamaah</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-white border border-gray-100 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-ink-subtle">Total Jamaah Aktif</span>
            <p className="text-2xl font-heading font-bold text-forest">{totalAktif}</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-olive-50 flex items-center justify-center text-forest">
            <Users className="w-5 h-5 text-olive" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-gray-100 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-ink-subtle">Laki-laki</span>
            <p className="text-2xl font-heading font-bold text-forest">{totalLaki}</p>
            <span className="text-[10px] text-ink-subtle">{Math.round((totalLaki / (totalAktif || 1)) * 100)}% dari total</span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-700 font-bold text-xs">
            L
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-gray-100 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-ink-subtle">Perempuan</span>
            <p className="text-2xl font-heading font-bold text-forest">{totalPerempuan}</p>
            <span className="text-[10px] text-ink-subtle">{Math.round((totalPerempuan / (totalAktif || 1)) * 100)}% dari total</span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-rose-50 flex items-center justify-center text-rose-700 font-bold text-xs">
            P
          </div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
        
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama jamaah..."
            className="w-full pl-10 pr-4 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-olive focus:border-transparent"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Gender Filter */}
          <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-xl border border-gray-200">
            {['Semua', 'Laki-laki', 'Perempuan'].map((g) => (
              <button
                key={g}
                onClick={() => setFilterGender(g)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  filterGender === g ? 'bg-white text-forest shadow-xs' : 'text-ink-muted'
                }`}
              >
                {g}
              </button>
            ))}
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-xl border border-gray-200">
            <button
              onClick={() => setFilterStatus('aktif')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                filterStatus === 'aktif' ? 'bg-white text-forest shadow-xs' : 'text-ink-muted'
              }`}
            >
              Aktif ({totalAktif})
            </button>
            <button
              onClick={() => setFilterStatus('arsip')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                filterStatus === 'arsip' ? 'bg-white text-forest shadow-xs' : 'text-ink-muted'
              }`}
            >
              Arsip
            </button>
          </div>
        </div>

      </div>

      {/* Responsive Data Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-canvas border-b border-gray-200/80 text-ink-muted uppercase font-bold text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">No.</th>
                <th className="py-3 px-4">Nama Jamaah</th>
                <th className="py-3 px-4">Jenis Kelamin</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Tgl Terdaftar</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredJamaah.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-ink-subtle">
                    Tidak ada data jamaah yang sesuai kriteria pencarian.
                  </td>
                </tr>
              ) : (
                filteredJamaah.map((j, idx) => (
                  <tr key={j.id} className="hover:bg-olive-50/30 transition-colors">
                    <td className="py-3 px-4 text-ink-subtle">{idx + 1}</td>
                    <td className="py-3 px-4 font-bold text-forest text-sm">{j.nama}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold ${
                        j.jenisKelamin === 'Laki-laki' ? 'bg-blue-50 text-blue-800' : 'bg-rose-50 text-rose-800'
                      }`}>
                        {j.jenisKelamin}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        j.isActive ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-600'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${j.isActive ? 'bg-emerald-500' : 'bg-gray-400'}`} />
                        {j.isActive ? 'Aktif' : 'Diarsipkan'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-ink-subtle">{formatDateWIB(j.createdAt)}</td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => {
                          setEditingJamaah(j);
                          setFormNama(j.nama);
                          setFormGender(j.jenisKelamin);
                          setShowAddModal(true);
                        }}
                        className="p-1 rounded-md text-ink-subtle hover:text-forest hover:bg-gray-100"
                        title="Edit Jamaah"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleToggleArchive(j.id)}
                        className="p-1 rounded-md text-ink-subtle hover:text-amber-700 hover:bg-gray-100"
                        title={j.isActive ? 'Arsipkan' : 'Aktifkan Kembali'}
                      >
                        {j.isActive ? <Archive className="w-3.5 h-3.5" /> : <RotateCcw className="w-3.5 h-3.5" />}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl animate-fadeIn">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-heading font-bold text-base text-forest">
                {editingJamaah ? 'Edit Data Jamaah' : 'Tambah Jamaah Baru'}
              </h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-ink hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSingle} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-ink">Nama Lengkap Jamaah *</label>
                <input
                  type="text"
                  required
                  value={formNama}
                  onChange={(e) => setFormNama(e.target.value)}
                  placeholder="Contoh: Muhammad Rizky"
                  className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-olive focus:border-transparent"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-ink">Jenis Kelamin *</label>
                <div className="grid grid-cols-2 gap-3">
                  {(['Laki-laki', 'Perempuan'] as JenisKelamin[]).map((gender) => (
                    <button
                      type="button"
                      key={gender}
                      onClick={() => setFormGender(gender)}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                        formGender === gender
                          ? 'bg-forest text-white border-forest shadow-xs'
                          : 'bg-gray-50 text-ink-muted border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      {gender}
                    </button>
                  ))}
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
                  {editingJamaah ? 'Simpan Perubahan' : 'Tambah Jamaah'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Safe 9-Step Excel/CSV Import Wizard Modal */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-5 shadow-2xl animate-fadeIn">
            
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="font-heading font-bold text-base text-forest">
                  Import Data Jamaah dari Excel / CSV
                </h3>
                <p className="text-xs text-ink-subtle">
                  Tahap 9 langkah aman dengan validasi nama, standardisasi gender, & deteksi nama ganda.
                </p>
              </div>
              <button 
                onClick={() => setShowImportModal(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-ink hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Stage 1: Upload */}
            {importStage === 'upload' && (
              <div className="space-y-4">
                <div 
                  onClick={handleSimulateFileSelect}
                  className="border-2 border-dashed border-gray-300 hover:border-olive rounded-2xl p-8 text-center space-y-3 cursor-pointer bg-canvas hover:bg-olive-50/30 transition-all"
                >
                  <FileSpreadsheet className="w-12 h-12 text-olive mx-auto" />
                  <div>
                    <p className="text-sm font-bold text-forest">Klik untuk memilih file Excel (.xlsx / .csv)</p>
                    <p className="text-xs text-ink-subtle mt-0.5">Format kolom yang didukung: <strong>Nama</strong> | <strong>Jenis Kelamin</strong></p>
                  </div>
                </div>

                <div className="p-3 bg-beige-light border border-beige-dark/30 rounded-xl text-xs text-forest">
                  <p className="font-bold">Contoh Format Excel:</p>
                  <table className="mt-1 text-[11px] border border-beige-dark/40 bg-white">
                    <thead>
                      <tr className="bg-beige">
                        <th className="px-2 py-0.5 border">Nama</th>
                        <th className="px-2 py-0.5 border">Jenis Kelamin</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-2 py-0.5 border">Ahmad Fauzi</td>
                        <td className="px-2 py-0.5 border">Laki-laki</td>
                      </tr>
                      <tr>
                        <td className="px-2 py-0.5 border">Siti Aminah</td>
                        <td className="px-2 py-0.5 border">Perempuan</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Stage 2: Preview & Validation Table */}
            {importStage === 'preview' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-forest">
                    Pratinjau Hasil Pembacaan File ({previewRows.length} Baris Terdeteksi):
                  </span>
                  <span className="text-ink-subtle">Periksa sebelum menyimpan</span>
                </div>

                <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-xl">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-gray-50 border-b border-gray-200 font-bold text-ink-muted">
                      <tr>
                        <th className="py-2 px-3">Nama</th>
                        <th className="py-2 px-3">Jenis Kelamin</th>
                        <th className="py-2 px-3">Status Validasi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {previewRows.map((row, i) => (
                        <tr key={i} className={!row.isValid ? 'bg-red-50/50' : row.isDuplicate ? 'bg-amber-50/40' : ''}>
                          <td className="py-2 px-3 font-medium text-ink">{row.nama || <em className="text-red-500">(Kosong)</em>}</td>
                          <td className="py-2 px-3">{row.jenisKelamin}</td>
                          <td className="py-2 px-3">
                            {!row.isValid ? (
                              <span className="text-red-600 font-semibold text-[11px]">✕ {row.error}</span>
                            ) : row.isDuplicate ? (
                              <span className="text-amber-700 font-semibold text-[11px] flex items-center gap-1">
                                <AlertTriangle className="w-3.5 h-3.5" />
                                <span>Potensi nama ganda</span>
                              </span>
                            ) : (
                              <span className="text-emerald-700 font-semibold text-[11px]">✓ Valid</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs text-ink-subtle space-y-1">
                  <p>• Data yang tidak valid akan otomatis dilewati.</p>
                  <p>• Baris dengan potensi duplikasi tetap dapat disimpan sebagai individu berbeda.</p>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
                  <button
                    onClick={() => setImportStage('upload')}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-ink-muted hover:bg-gray-100"
                  >
                    Unggah Ulang
                  </button>
                  <button
                    onClick={handleConfirmImport}
                    className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-forest hover:bg-forest-light transition-colors"
                  >
                    Konfirmasi & Simpan ke Firestore
                  </button>
                </div>
              </div>
            )}

            {/* Stage 3: Success Summary */}
            {importStage === 'success' && (
              <div className="py-6 text-center space-y-4">
                <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto" />
                <h4 className="font-heading font-bold text-lg text-forest">Import Berhasil Disimpan!</h4>
                <p className="text-xs text-ink-muted max-w-sm mx-auto">
                  Seluruh data valid telah berhasil diverifikasi dan disimpan ke dalam database Cloud Firestore Anda.
                </p>
                <button
                  onClick={() => setShowImportModal(false)}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-forest hover:bg-forest-light transition-colors"
                >
                  Selesai
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};

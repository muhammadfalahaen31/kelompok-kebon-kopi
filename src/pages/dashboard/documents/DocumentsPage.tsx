import React, { useState } from 'react';
import { 
  FolderArchive, 
  Search, 
  Filter, 
  Plus, 
  Upload, 
  Download, 
  FileText, 
  Image as ImageIcon, 
  Eye, 
  Trash2, 
  Globe, 
  Lock,
  X,
  FileCheck
} from 'lucide-react';
import { DocumentArchive, DocumentCategory } from '../../../types/document.types';
import { formatDateWIB } from '../../../utils/dateUtils';

export const DocumentsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  const [documents, setDocuments] = useState<DocumentArchive[]>([
    {
      id: 'doc-001',
      judul: 'SK Susunan Pengurus & Jobdesk Penerobos 2026',
      kategori: 'Jobdesk Penerobos',
      fileUrl: '#',
      fileName: 'SK_Penerobos_Kebon_Kopi_2026.pdf',
      fileSize: 1024 * 450, // 450 KB
      mimeType: 'application/pdf',
      keterangan: 'Dokumen pembagian peran dan tanggung jawab anggota.',
      isPublic: false,
      uploadedAt: '2026-10-01T08:00:00Z',
      uploadedBy: 'Ahmad Fauzi',
    },
    {
      id: 'doc-002',
      judul: 'Notulensi Musyawarah Kerja Awal Triwulan',
      kategori: 'Hasil Musyawarah',
      fileUrl: '#',
      fileName: 'Notulensi_Musyawarah_Okt2026.pdf',
      fileSize: 1024 * 320,
      mimeType: 'application/pdf',
      keterangan: 'Keputusan pengadaan sarana dan evaluasi pengajian.',
      isPublic: false,
      uploadedAt: '2026-10-15T09:00:00Z',
      uploadedBy: 'Ahmad Fauzi',
    },
    {
      id: 'doc-003',
      judul: 'Foto Dokumentasi Pengajian Rutin Pekan 1',
      kategori: 'Dokumentasi Pengajian',
      fileUrl: '#',
      fileName: 'Dokumentasi_Pengajian_03112026.jpg',
      fileSize: 1024 * 1200,
      mimeType: 'image/jpeg',
      keterangan: 'Foto resmi telah disetujui untuk ditampilkan di galeri publik.',
      isPublic: true,
      uploadedAt: '2026-11-04T10:00:00Z',
      uploadedBy: 'Ahmad Fauzi',
    },
  ]);

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [formJudul, setFormJudul] = useState('');
  const [formKategori, setFormKategori] = useState<DocumentCategory>('Dokumen Organisasi');
  const [formIsPublic, setFormIsPublic] = useState(false);
  const [formKeterangan, setFormKeterangan] = useState('');

  const categories = [
    'Semua',
    'Dokumen Organisasi',
    'Jobdesk Penerobos',
    'Hasil Musyawarah',
    'Dokumentasi Pengajian',
    'Laporan',
    'Dokumen Lainnya',
  ];

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch = doc.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.fileName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'Semua' || doc.kategori === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleSimulateUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formJudul) return;

    const newDoc: DocumentArchive = {
      id: `doc-${Date.now().toString().slice(-4)}`,
      judul: formJudul,
      kategori: formKategori,
      fileUrl: '#',
      fileName: `${formJudul.replace(/\s+/g, '_')}.pdf`,
      fileSize: 1024 * 250,
      mimeType: 'application/pdf',
      keterangan: formKeterangan,
      isPublic: formIsPublic,
      uploadedAt: new Date().toISOString(),
      uploadedBy: 'Admin',
    };

    setDocuments([newDoc, ...documents]);
    setShowUploadModal(false);
    setFormJudul('');
    setFormKeterangan('');
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-xs">
        <div>
          <h1 className="text-2xl font-heading font-bold text-forest">
            Arsip & Dokumentasi Terpusat
          </h1>
          <p className="text-xs text-ink-muted mt-0.5">
            Pusat penyimpanan dokumen organisasi, SK jobdesk, bukti musyawarah, dan media foto kegiatan.
          </p>
        </div>

        <button
          onClick={() => setShowUploadModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-forest hover:bg-forest-light shadow-xs transition-colors"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Berkas / Foto</span>
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
            placeholder="Cari nama dokumen atau berkas..."
            className="w-full pl-10 pr-4 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-olive focus:border-transparent"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                selectedCategory === cat ? 'bg-forest text-white shadow-xs' : 'bg-gray-50 text-ink-muted hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocs.map((doc) => (
          <div key={doc.id} className="card-soft p-5 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-semibold bg-olive-50 text-olive-dark border border-olive-100">
                  {doc.kategori}
                </span>

                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold ${
                  doc.isPublic ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-600'
                }`}>
                  {doc.isPublic ? <Globe className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                  <span>{doc.isPublic ? 'Publik' : 'Internal'}</span>
                </span>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-forest-50 text-forest flex items-center justify-center shrink-0">
                  {doc.mimeType.includes('image') ? <ImageIcon className="w-5 h-5 text-olive" /> : <FileText className="w-5 h-5 text-forest" />}
                </div>
                <div>
                  <h3 className="font-heading font-bold text-sm text-forest leading-snug">{doc.judul}</h3>
                  <p className="text-[11px] text-ink-subtle mt-0.5">{doc.fileName}</p>
                </div>
              </div>

              {doc.keterangan && (
                <p className="text-xs text-ink-muted line-clamp-2 leading-relaxed">
                  {doc.keterangan}
                </p>
              )}
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-ink-subtle">
              <span>{formatFileSize(doc.fileSize)} • {formatDateWIB(doc.uploadedAt)}</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => alert(`Mengunduh file: ${doc.fileName}`)}
                  className="p-1.5 rounded-lg hover:bg-gray-100 text-forest"
                  title="Unduh Berkas"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl animate-fadeIn">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-heading font-bold text-base text-forest">Unggah Berkas / Dokumen</h3>
              <button onClick={() => setShowUploadModal(false)} className="p-1 rounded-lg text-gray-400 hover:text-ink">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSimulateUpload} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-ink">Judul Dokumen *</label>
                <input
                  type="text"
                  required
                  value={formJudul}
                  onChange={(e) => setFormJudul(e.target.value)}
                  placeholder="Contoh: SK Pengurus 2026"
                  className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-hidden focus:border-olive"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-ink">Kategori Berkas</label>
                <select
                  value={formKategori}
                  onChange={(e) => setFormKategori(e.target.value as DocumentCategory)}
                  className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-hidden focus:border-olive"
                >
                  {categories.filter((c) => c !== 'Semua').map((cat) => (
                    <option key={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-ink">Keterangan / Deskripsi</label>
                <textarea
                  rows={2}
                  value={formKeterangan}
                  onChange={(e) => setFormKeterangan(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-hidden focus:border-olive"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="chkPublic"
                  checked={formIsPublic}
                  onChange={(e) => setFormIsPublic(e.target.checked)}
                  className="rounded text-forest focus:ring-olive"
                />
                <label htmlFor="chkPublic" className="text-xs text-ink cursor-pointer">
                  Tampilkan di Galeri / Informasi Website Publik
                </label>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-ink-muted hover:bg-gray-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-forest hover:bg-forest-light transition-colors"
                >
                  Simpan Dokumen
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export type DocumentCategory = 
  | 'Dokumen Organisasi' 
  | 'Jobdesk Penerobos' 
  | 'Hasil Musyawarah' 
  | 'Dokumentasi Pengajian' 
  | 'Laporan' 
  | 'Dokumen Lainnya';

export interface DocumentArchive {
  id: string;
  judul: string;
  kategori: DocumentCategory;
  fileUrl: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  keterangan?: string;
  isPublic: boolean;
  uploadedAt: string;
  uploadedBy: string;
}

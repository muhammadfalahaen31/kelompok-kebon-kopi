export type PenerobosStatus = 'Belum Dimulai' | 'Sedang Dikerjakan' | 'Selesai' | 'Perlu Evaluasi';

export interface PenerobosJobdesk {
  id: string;
  namaAnggota: string;
  jabatan: string;
  deskripsiJobdesk: string;
  tanggungJawab: string;
  targetPekerjaan: string;
  status: PenerobosStatus;
  catatanEvaluasi?: string;
  dokumenPendukungUrl?: string;
  dokumenPendukungNama?: string;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy?: string;
}

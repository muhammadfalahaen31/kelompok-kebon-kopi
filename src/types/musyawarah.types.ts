export type MusyawarahStatus = 
  | 'Belum Dilaksanakan' 
  | 'Sedang Berjalan' 
  | 'Selesai' 
  | 'Tertunda' 
  | 'Tidak Dilanjutkan';

export interface MusyawarahProgressHistory {
  id: string;
  tanggal: string;
  persentase: number;
  catatan: string;
  updatedBy: string;
}

export interface MusyawarahDecision {
  id: string;
  judulKeputusan: string;
  deskripsi: string;
  tanggalMusyawarah: string; // YYYY-MM-DD
  penanggungJawab: string;
  targetPenyelesaian: string; // YYYY-MM-DD
  persentaseProgres: number; // 0 - 100
  status: MusyawarahStatus;
  catatanPerkembangan?: string;
  buktiDokumenUrl?: string;
  buktiDokumenNama?: string;
  riwayatProgres?: MusyawarahProgressHistory[];
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface MusyawarahSummary {
  totalKeputusan: number;
  selesai: number;
  sedangBerjalan: number;
  belumDilaksanakan: number;
  tertunda: number;
  tidakDilanjutkan: number;
  programAktif: number;
  rataRataKetercapaian: number; // calculated from active programs only
}

export type JenisKelamin = 'Laki-laki' | 'Perempuan';

export interface Jamaah {
  id: string; // auto-generated Firestore doc ID
  nama: string;
  jenisKelamin: JenisKelamin;
  isActive: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  createdBy?: string;
  updatedBy?: string;
}

export interface JamaahImportRow {
  nama: string;
  jenisKelamin: JenisKelamin;
  isValid: boolean;
  isDuplicate?: boolean;
  error?: string;
}

export interface JamaahStats {
  total: number;
  lakiLaki: number;
  perempuan: number;
  aktif: number;
  nonAktif: number;
}

import { JenisKelamin } from './jamaah.types';

export type AttendanceStatus = 'Hadir' | 'Izin' | 'Sakit' | 'Alpa';

export interface PengajianSchedule {
  id: string; // auto-generated Firestore doc ID
  namaPengajian: string;
  tanggal: string; // YYYY-MM-DD
  waktu: string; // HH:mm (WIB)
  lokasi: string;
  deskripsi: string;
  status: 'Terjadwal' | 'Selesai' | 'Dibatalkan';
  totalHadir: number;
  totalIzin: number;
  totalSakit: number;
  totalAlpa: number;
  createdAt: string;
  createdBy: string;
  updatedAt?: string;
}

export interface AttendanceRecord {
  id: string; // composite: `${pengajianId}_${jamaahId}`
  pengajianId: string;
  jamaahId: string;
  jamaahNama: string;
  jamaahJenisKelamin: JenisKelamin;
  status: AttendanceStatus;
  keterangan?: string;
  updatedAt: string;
  updatedBy: string;
}

export interface AttendanceSummary {
  totalKegiatan: number;
  totalHadir: number;
  totalIzin: number;
  totalSakit: number;
  totalAlpa: number;
  persentaseKehadiran: number;
  perbandinganGender: {
    lakiLaki: { hadir: number; total: number; persentase: number };
    perempuan: { hadir: number; total: number; persentase: number };
  };
}

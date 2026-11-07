import { 
  collection, 
  doc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  query, 
  where, 
  orderBy, 
  writeBatch 
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';
import { PengajianSchedule, AttendanceRecord, AttendanceStatus } from '../types/attendance.types';

const SCH_COLLECTION = 'pengajian';
const ATT_COLLECTION = 'attendance';

export const getSchedules = async (): Promise<PengajianSchedule[]> => {
  if (!isFirebaseConfigured()) return [];
  const colRef = collection(db, SCH_COLLECTION);
  const q = query(colRef, orderBy('tanggal', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((snap: any) => ({
    id: snap.id,
    ...snap.data(),
  }));
};

export const createSchedule = async (
  data: Omit<PengajianSchedule, 'id' | 'createdAt' | 'totalHadir' | 'totalIzin' | 'totalSakit' | 'totalAlpa'>
): Promise<string> => {
  if (!isFirebaseConfigured()) return `sch-${Date.now()}`;
  const colRef = collection(db, SCH_COLLECTION);
  const docRef = await addDoc(colRef, {
    ...data,
    totalHadir: 0,
    totalIzin: 0,
    totalSakit: 0,
    totalAlpa: 0,
    createdAt: new Date().toISOString(),
  });
  return docRef.id;
};

export const getAttendanceRecords = async (pengajianId: string): Promise<AttendanceRecord[]> => {
  if (!isFirebaseConfigured()) return [];
  const colRef = collection(db, ATT_COLLECTION);
  const q = query(colRef, where('pengajianId', '==', pengajianId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((snap: any) => ({
    id: snap.id,
    ...snap.data(),
  }));
};

export const saveAttendanceBatch = async (
  pengajianId: string,
  records: Array<{
    jamaahId: string;
    jamaahNama: string;
    jamaahJenisKelamin: 'Laki-laki' | 'Perempuan';
    status: AttendanceStatus;
    keterangan?: string;
  }>,
  operator = 'Admin'
): Promise<void> => {
  if (!isFirebaseConfigured()) return;

  const batch = writeBatch(db);
  let hadir = 0;
  let izin = 0;
  let sakit = 0;
  let alpa = 0;

  for (const r of records) {
    if (r.status === 'Hadir') hadir++;
    else if (r.status === 'Izin') izin++;
    else if (r.status === 'Sakit') sakit++;
    else if (r.status === 'Alpa') alpa++;

    const docId = `${pengajianId}_${r.jamaahId}`;
    const docRef = doc(db, ATT_COLLECTION, docId);
    batch.set(docRef, {
      id: docId,
      pengajianId,
      jamaahId: r.jamaahId,
      jamaahNama: r.jamaahNama,
      jamaahJenisKelamin: r.jamaahJenisKelamin,
      status: r.status,
      keterangan: r.keterangan || '',
      updatedAt: new Date().toISOString(),
      updatedBy: operator,
    });
  }

  // Update schedule status & totals
  const schDocRef = doc(db, SCH_COLLECTION, pengajianId);
  batch.update(schDocRef, {
    totalHadir: hadir,
    totalIzin: izin,
    totalSakit: sakit,
    totalAlpa: alpa,
    status: 'Selesai',
    updatedAt: new Date().toISOString(),
  });

  await batch.commit();
};

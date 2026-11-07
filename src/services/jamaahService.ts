import { 
  collection, 
  doc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  query, 
  where, 
  orderBy, 
  serverTimestamp,
  writeBatch 
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';
import { Jamaah, JenisKelamin } from '../types/jamaah.types';

const COLLECTION_NAME = 'jamaah';

export const getJamaahList = async (onlyActive = true): Promise<Jamaah[]> => {
  if (!isFirebaseConfigured()) {
    // Return sample data when in local development / pre-connected mode
    return [];
  }

  const colRef = collection(db, COLLECTION_NAME);
  const q = onlyActive 
    ? query(colRef, where('isActive', '==', true), orderBy('nama', 'asc'))
    : query(colRef, orderBy('nama', 'asc'));

  const snapshot = await getDocs(q);
  return snapshot.docs.map((docSnap: any) => ({
    id: docSnap.id,
    ...(docSnap.data() as Omit<Jamaah, 'id'>),
  }));
};

export const addSingleJamaah = async (nama: string, jenisKelamin: JenisKelamin, creator = 'Admin'): Promise<string> => {
  if (!isFirebaseConfigured()) return `jm-${Date.now()}`;

  const colRef = collection(db, COLLECTION_NAME);
  const docRef = await addDoc(colRef, {
    nama: nama.trim(),
    jenisKelamin,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: creator,
    updatedBy: creator,
  });
  return docRef.id;
};

export const updateJamaah = async (id: string, updates: Partial<Jamaah>): Promise<void> => {
  if (!isFirebaseConfigured()) return;
  const docRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(docRef, {
    ...updates,
    updatedAt: new Date().toISOString(),
  });
};

export const batchImportJamaah = async (
  rows: Array<{ nama: string; jenisKelamin: JenisKelamin }>,
  creator = 'Admin'
): Promise<number> => {
  if (!isFirebaseConfigured()) return rows.length;

  const batch = writeBatch(db);
  const colRef = collection(db, COLLECTION_NAME);

  for (const row of rows) {
    const newDocRef = doc(colRef);
    batch.set(newDocRef, {
      nama: row.nama.trim(),
      jenisKelamin: row.jenisKelamin,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: creator,
      updatedBy: creator,
    });
  }

  await batch.commit();
  return rows.length;
};

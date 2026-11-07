import { 
  collection, 
  doc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  query, 
  where, 
  orderBy 
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';
import { MusyawarahDecision, MusyawarahStatus } from '../types/musyawarah.types';

const COLLECTION_NAME = 'musyawarah';

export const getMusyawarahList = async (includeArchived = false): Promise<MusyawarahDecision[]> => {
  if (!isFirebaseConfigured()) return [];
  const colRef = collection(db, COLLECTION_NAME);
  const q = includeArchived
    ? query(colRef, orderBy('createdAt', 'desc'))
    : query(colRef, where('isArchived', '==', false), orderBy('createdAt', 'desc'));

  const snapshot = await getDocs(q);
  return snapshot.docs.map((snap: any) => ({
    id: snap.id,
    ...snap.data(),
  }));
};

export const addMusyawarahDecision = async (
  data: Omit<MusyawarahDecision, 'id' | 'createdAt' | 'updatedAt' | 'isArchived'>,
  operator = 'Admin'
): Promise<string> => {
  if (!isFirebaseConfigured()) return `msy-${Date.now()}`;
  const colRef = collection(db, COLLECTION_NAME);
  const docRef = await addDoc(colRef, {
    ...data,
    persentaseProgres: data.persentaseProgres || 0,
    isArchived: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: operator,
  });
  return docRef.id;
};

export const updateMusyawarahProgress = async (
  id: string,
  progress: number,
  status: MusyawarahStatus,
  note?: string,
  operator = 'Admin'
): Promise<void> => {
  if (!isFirebaseConfigured()) return;
  const docRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(docRef, {
    persentaseProgres: progress,
    status: status,
    ...(note ? { catatanPerkembangan: note } : {}),
    updatedAt: new Date().toISOString(),
    updatedBy: operator,
  });
};

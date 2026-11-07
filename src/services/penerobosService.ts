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
import { PenerobosJobdesk, PenerobosStatus } from '../types/penerobos.types';

const COLLECTION_NAME = 'penerobos';

export const getPenerobosList = async (includeArchived = false): Promise<PenerobosJobdesk[]> => {
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

export const addPenerobosJobdesk = async (
  data: Omit<PenerobosJobdesk, 'id' | 'createdAt' | 'updatedAt' | 'isArchived'>,
  operator = 'Admin'
): Promise<string> => {
  if (!isFirebaseConfigured()) return `pnb-${Date.now()}`;
  const colRef = collection(db, COLLECTION_NAME);
  const docRef = await addDoc(colRef, {
    ...data,
    isArchived: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: operator,
  });
  return docRef.id;
};

export const updatePenerobosStatus = async (
  id: string,
  status: PenerobosStatus,
  catatan?: string
): Promise<void> => {
  if (!isFirebaseConfigured()) return;
  const docRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(docRef, {
    status,
    ...(catatan ? { catatanEvaluasi: catatan } : {}),
    updatedAt: new Date().toISOString(),
  });
};

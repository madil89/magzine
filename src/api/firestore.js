import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';

const MAGAZINES = 'magazines';
const GALLERIES = 'galleries';

const createNewMagazine = async (file) => {
  const db = getFirestore();
  const docRef = await addDoc(collection(db, MAGAZINES), {
    ...file,
    created_at: Date.now(),
    updated_at: Date.now(),
  });
  return docRef.id;
};

const deleteMagazine = async (id) => {
  const db = getFirestore();
  await deleteDoc(doc(db, MAGAZINES, id));
};

const createNewGallery = async (file) => {
  const db = getFirestore();
  const docRef = await addDoc(collection(db, GALLERIES), {
    ...file,
  });
  return docRef.id;
};

const getAllMagazines = async () => {
  const db = getFirestore();
  return getDocs(collection(db, MAGAZINES))
    .then((snapShot) => snapShot.docs.map((document) => ({ ...document.data(), id: document.id })));
};

const getAllGalleries = async () => {
  const db = getFirestore();
  return getDocs(collection(db, GALLERIES))
    .then((snapShot) => snapShot.docs.map((document) => ({ ...document.data(), id: document.id })));
};

const getMagazineById = async (id) => {
  const db = getFirestore();
  return getDoc(doc(db, `${MAGAZINES}/${id}`)).then((snapShot) => ({ ...snapShot.data(), id: snapShot.id }));
};

const updateMagazine = async (id, magazine) => {
  const db = getFirestore();
  const ref = doc(db, `${MAGAZINES}/${id}`);
  return updateDoc(ref, { ...magazine, updated_at: Date.now() });
};
const updateGallery = async (id, gallery) => {
  const db = getFirestore();
  return setDoc(doc(db, `${GALLERIES}/${id}`), gallery);
};

export default {
  createNewMagazine,
  deleteMagazine,
  getAllMagazines,
  getMagazineById,
  updateMagazine,
  createNewGallery,
  getAllGalleries,
  updateGallery,
};

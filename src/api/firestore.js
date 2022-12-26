import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  setDoc,
} from 'firebase/firestore';

const createNewMagazine = async (file) => {
  const db = getFirestore();
  const docRef = await addDoc(collection(db, 'magazines'), {
    ...file,
  });
  return docRef.id;
};

const getAllMagazines = async () => {
  const db = getFirestore();
  return getDocs(collection(db, 'magazines'))
    .then((snapShot) => snapShot.docs.map((document) => ({ ...document.data(), id: document.id })));
};

const getMagazineById = async (id) => {
  const db = getFirestore();
  return getDoc(doc(db, `magazines/${id}`)).then((snapShot) => snapShot.data());
};

const updateMagazine = async (id, magazine) => {
  const db = getFirestore();
  return setDoc(doc(db, `magazines/${id}`), magazine);
};

export default {
  createNewMagazine,
  getAllMagazines,
  getMagazineById,
  updateMagazine,
};

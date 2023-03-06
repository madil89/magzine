import { getAuth } from 'firebase/auth';
import {
  collection,
  doc, getFirestore,
  query, setDoc, updateDoc, where, onSnapshot,
} from 'firebase/firestore';

const getUserId = () => getAuth().currentUser.uid;
const db = getFirestore();

const subscribeUserImages = (userId, onResult) => {
  const q = query(collection(db, 'userImages'), where('userId', '==', userId));

  return onSnapshot(q, (querySnapshot) => {
    const snapshotResult = [];
    querySnapshot.forEach((item) => {
      snapshotResult.push({ id: item.id, ...item.data() });
    });
    onResult(snapshotResult);
  });
};

const updateImageDescription = (id, description) => {
  const ref = doc(db, 'userImages', id);
  return updateDoc(ref, {
    description,
  });
};
const addUserImage = async (image) => {
  const imageRef = doc(collection(db, 'userImages'));
  const imageWithId = { id: imageRef.id, ...image };
  return setDoc(imageRef, imageWithId).then(() => imageWithId);
  // addDoc(collection(db, 'userImages'), image).then((docRef) => ({ id: docRef.id, ...image }));
};

const addUserImages = (images) => {
  const imagePromises = images.map((image) => addUserImage(image));
  return Promise.all(imagePromises);
};
export default {
  getUserId,
  addUserImages,
  updateImageDescription,
  subscribeUserImages,
};

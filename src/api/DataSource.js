import { getAuth } from 'firebase/auth';
import {
  collection,
  doc, getFirestore,
  query, setDoc, updateDoc, where, onSnapshot, deleteDoc, getDocs, orderBy,
} from 'firebase/firestore';
import firebaseStorage from './firebaseStorage';

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

const subscribeMagazineImages = (magazineId, onResult) => {
  const q = query(
    collection(db, 'userImages'),
    where('magazine_id', 'array-contains', magazineId),
    // orderBy('created_at'),
  );

  return onSnapshot(q, (querySnapshot) => {
    const snapshotResult = [];
    querySnapshot.forEach((item) => {
      snapshotResult.push({ id: item.id, ...item.data() });
    });
    onResult(snapshotResult);
  });
};

const subscribeImages = (onResult) => {
  const q = query(collection(db, 'userImages'));

  return onSnapshot(q, (querySnapshot) => {
    const snapshotResult = [];
    querySnapshot.forEach((item) => {
      snapshotResult.push({ id: item.id, ...item.data() });
    });
    onResult(snapshotResult);
  });
};

const getMagazineImages = async (magazineId) => {
  const q = query(
    collection(db, 'userImages'),
    where('magazine_id', '==', magazineId),
    orderBy('created_at', 'desc'),
  );
  const querySnapshot = await getDocs(q);
  const images = [];
  querySnapshot.forEach((_doc) => {
    images.push(_doc.data());
  });
  return images;
};

const getUserImagePath = () => 'userImages';

const updateImage = ({ path, updatedImage }) => {
  const ref = doc(db, path, updatedImage.id);
  return updateDoc(ref, {
    ...updatedImage,
    updated_at: Date.now(),
  });
};
const addUserImage = async (image) => {
  const imageRef = doc(collection(db, 'userImages'));
  const imageWithId = {
    id: imageRef.id, created_at: Date.now(), updated_at: Date.now(), ...image,
  };
  return setDoc(imageRef, imageWithId).then(() => imageWithId);
};

const deleteImage = (image) => Promise.all([deleteDoc(doc(db, 'userImages', image.id)), firebaseStorage.deleteImageFromStorage(image.imageId)]);
const addUserImages = (images) => {
  const imagePromises = images.map((image) => addUserImage(image));
  return Promise.all(imagePromises);
};

export default {
  getUserId,
  addUserImages,
  updateImage,
  subscribeUserImages,
  subscribeImages,
  deleteImage,
  getUserImagePath,
  getMagazineImages,
  subscribeMagazineImages,
};

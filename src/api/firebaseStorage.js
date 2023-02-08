/* eslint-disable no-console */
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
  uploadBytes,
  deleteObject,
} from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import uuid from 'react-uuid';

const createFileId = (fileName) => `${Date.now()}_${fileName}`;

const getMagazineImageId = (magazineId, file) => {
  const fileName = createFileId(file.name);
  const imageId = `magazines/${magazineId}/images/${fileName}`;
  return imageId;
};

const uploadImage = (imageId, file) => {
  // const fileName = `${Date.now()}_${file.name}`;
  const storage = getStorage();
  // const imageId = `magazines/${magazineId}/images/${fileName}`;
  const storageRef = ref(storage, imageId);
  const uploadTask = uploadBytesResumable(storageRef, file);
  uploadTask.on('state_changed', (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log(`upload is ${progress} %done`);
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
      default:
        console.log('default case');
    }
  });
  return uploadTask
    .then(() => getDownloadURL(uploadTask.snapshot.ref))
    .then((url) => ({
      url,
      id: imageId,
      description: '',
    }));
};
const uploadMagazineImage = (magazineId, file) => {
  const imageId = getMagazineImageId(magazineId, file);
  return uploadImage(imageId, file);
};
/**
 * Convert BASE64 to BLOB
 * @param base64Image Pass Base64 image data to convert into the BLOB
 */
const convertBase64ToBlob = (base64Image) => {
  // Split into two parts
  const parts = base64Image.split(';base64,');

  // Hold the content type
  const imageType = parts[0].split(':')[1];

  // Decode Base64 string
  const decodedData = window.atob(parts[1]);

  // Create UNIT8ARRAY of size same as row data length
  const uInt8Array = new Uint8Array(decodedData.length);

  // Insert all character code into uInt8Array
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < decodedData.length; ++i) {
    uInt8Array[i] = decodedData.charCodeAt(i);
  }

  // Return BLOB image after conversion
  return new Blob([uInt8Array], { type: imageType });
};

const uploadByteArrayImage = (imageCode) => {
  const { uid } = getAuth().currentUser;
  const fileName = `${uuid()}.jpg`;
  const storage = getStorage();
  const metadata = {
    contentType: 'image/jpeg',
  };
  const imageId = `${uid}/images/${fileName}`;
  const storageRef = ref(storage, imageId);
  // eslint-disable-next-line no-undef
  const blob = convertBase64ToBlob(imageCode);
  return uploadBytes(storageRef, blob, metadata)
    .then((snapshot) => getDownloadURL(snapshot.ref))
    .then((url) => ({
      url,
      blob,
      imageId,
    }));
};

const getImageIdsFromRecord = (deletedRecords) => {
  const imagesToDelete = deletedRecords
    .filter((_record) => _record.imageId)
    .map((_record) => _record.imageId);
  console.log('images to delete', imagesToDelete);
  return imagesToDelete;
};
const deleteImage = (deletedRecords) => {
  const imageIds = getImageIdsFromRecord(deletedRecords);
  const storage = getStorage();
  // Create a reference to the file to delete
  Promise.all(
    imageIds.map((imageId) => {
      const imageRef = ref(storage, imageId);
      return deleteObject(imageRef);
    }),
  );
};
export default {
  uploadMagazineImage,
  uploadByteArrayImage,
  deleteImage,
};

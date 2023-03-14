import { useEffect, useState } from 'react';
import DataSource from '../api/DataSource';

export const useImage = () => {
  const [images, setImages] = useState([]);

  const updateImage = ({ image, magazineId, checked }) => {
    let updatedImage = { ...image };
    if (checked) {
      updatedImage = {
        ...updatedImage,
        magazine_id: [...updatedImage.magazine_id, magazineId],
      };
    } else {
      updatedImage = {
        ...updatedImage,
        magazine_id: [...updatedImage.magazine_id.filter((id) => id !== magazineId)],
      };
    }
    DataSource.updateImage({ path: DataSource.getUserImagePath(), updatedImage });
  };
  useEffect(() => {
    const unsbuscribe = DataSource.subscribeImages((results) => {
      setImages(results || []);
    });
    return () => {
      unsbuscribe();
    };
  }, []);
  return { images, updateImage };
};
export default {

};

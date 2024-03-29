import { useEffect, useState } from 'react';
import DataSource from '../api/DataSource';

export const useImage = () => {
  const [images, setImages] = useState([]);

  const updateImage = ({ updatedImage }) => {
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

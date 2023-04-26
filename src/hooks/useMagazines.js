import { useEffect, useState } from 'react';
import DataSource from '../api/DataSource';
import Utility from '../Utility';

export const useMagazines = () => {
  const [magazines, setMagazines] = useState([]);

  const getMagazineImages = (magazineId) => DataSource.getMagazineImages(magazineId);

  const deleteMagazineImages = async (images, magazineId) => {
    const updatedImages = Utility.deleteImageFromMagazine(images, magazineId);
    updatedImages.forEach(async (img) => {
      await DataSource.updateImage(
        { path: DataSource.getUserImagePath(), updatedImage: img },
      );
    });
  };
  const deleteMagazine = async (magazine) => {
    const images = await getMagazineImages(magazine.id);
    await deleteMagazineImages(images, magazine.id);
    await DataSource.deleteMagazine(magazine.id);
  };

  useEffect(() => {
    const unsbuscribe = DataSource.subscribeAllMagazines((results) => {
      setMagazines(results || []);
    });
    return () => {
      unsbuscribe();
    };
  }, []);
  return { magazines, deleteMagazine };
};

export default {
  useMagazines,
};

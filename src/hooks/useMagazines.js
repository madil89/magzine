import { useEffect, useState } from 'react';
import DataSource from '../api/DataSource';

export const useMagazines = () => {
  const [magazines, setMagazines] = useState([]);

  const getMagazineImages = () => {
  };

  const deleteMagazineImages = () => {
  };
  const deleteMagazine = (magazine) => {
    getMagazineImages(magazine.id);
    deleteMagazineImages();
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

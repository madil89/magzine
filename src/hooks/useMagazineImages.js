import { useEffect, useState } from 'react';
import DataSource from '../api/DataSource';
import firestore from '../api/firestore';

export const useMagazineImage = (magazineId) => {
  const [magazineImage, setMagazineImages] = useState([]);
  const [magazine, setMagazine] = useState(null);
  useEffect(() => {
    const unsbuscribe = DataSource.subscribeMagazineImages(magazineId, (results) => {
      setMagazineImages(results || []);
    });
    return () => {
      unsbuscribe();
    };
  }, []);

  useEffect(() => {
    firestore.getMagazineById(magazineId).then((result) => {
      setMagazine(result);
    });
  }, []);

  const updateMagazin = (updated) => {
    setMagazine(updated);
  };
  return { magazineImage, magazine, updateMagazin };
};
export default {

};

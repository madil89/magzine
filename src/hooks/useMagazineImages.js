import { useEffect, useState } from 'react';
import DataSource from '../api/DataSource';
import firestore from '../api/firestore';

export const useMagazineImage = (magazineId) => {
  const [magazineImage, setMagazineImages] = useState([]);
  const [magazine, setMagazine] = useState(null);
  const [_magazineId, setMagazineId] = useState(magazineId);
  useEffect(() => {
    const unsbuscribe = DataSource.subscribeMagazineImages(_magazineId, (results) => {
      setMagazineImages(results || []);
    });
    return () => {
      unsbuscribe();
    };
  }, [_magazineId]);

  useEffect(() => {
    firestore.getMagazineById(magazineId).then((result) => {
      setMagazine(result);
    });
  }, []);

  const updateMagazin = (updated) => {
    setMagazine(updated);
  };
  const loadMagazine = (id) => {
    setMagazineId(id);
  };
  return {
    magazineImage, magazine, updateMagazin, loadMagazine,
  };
};
export default {

};

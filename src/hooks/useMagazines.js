import { useEffect, useState } from 'react';
import DataSource from '../api/DataSource';

export const useMagazines = () => {
  const [magazines, setMagazines] = useState([]);
  useEffect(() => {
    const unsbuscribe = DataSource.subscribeAllMagazines((results) => {
      setMagazines(results || []);
    });
    return () => {
      unsbuscribe();
    };
  }, []);
  return magazines;
};
export default {
  useMagazines,
};

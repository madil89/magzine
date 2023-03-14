import { useEffect, useState } from 'react';
import firestore from '../api/firestore';

export const useMagazines = () => {
  const [magazines, setMagazines] = useState([]);
  useEffect(() => {
    firestore.getAllMagazines().then((results) => {
      setMagazines(results);
    });
    return () => {

    };
  }, []);
  return magazines;
};
export default {

};

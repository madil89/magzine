import { useEffect, useState } from 'react';
import DataSource from '../api/DataSource';

export const useUserImage = () => {
  const [userImages, setUserImages] = useState([]);
  useEffect(() => {
    const unsbuscribe = DataSource.subscribeUserImages(DataSource.getUserId(), (results) => {
      setUserImages(results || []);
    });
    return () => {
      unsbuscribe();
    };
  }, []);
  return [userImages, setUserImages];
};
export default {

};

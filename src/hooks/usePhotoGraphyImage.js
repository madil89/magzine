/* eslint-disable import/prefer-default-export */

import { useEffect, useState } from 'react';
import DataSource from '../api/DataSource';

export const usePhotoGraphyImage = () => {
  const [photoGraphyImages, setPhotoGraphyImages] = useState([]);
  useEffect(() => {
    const unsbuscribe = DataSource.subscribePhotoGraphyImages((results) => {
      setPhotoGraphyImages(results || []);
    });
    return () => {
      unsbuscribe();
    };
  }, []);
  return {
    photoGraphyImages,
  };
};

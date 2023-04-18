/* eslint-disable import/prefer-default-export */

import { useEffect, useState } from 'react';
import DataSource from '../api/DataSource';

export const useGalleryImage = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  useEffect(() => {
    const unsbuscribe = DataSource.subscribeGalleryImages((results) => {
      setGalleryImages(results || []);
    });
    return () => {
      unsbuscribe();
    };
  }, []);
  return {
    galleryImages,
  };
};

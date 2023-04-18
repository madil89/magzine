import {
  ImageList, ImageListItem, Typography,
} from '@mui/material';

import React from 'react';
import { useGalleryImage } from '../../hooks/useGalleryImage';

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

function Gallery() {
  const { galleryImages } = useGalleryImage();
  return (
    <div>
      <Typography>Gallery</Typography>
      <ImageList
        sx={{ width: 500, height: 450 }}
        variant="quilted"
        cols={4}
        rowHeight={121}
      >
        {galleryImages.map((item) => (
          <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
            <img
              {...srcset(item.url, 121, item.rows, item.cols)}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>

    </div>
  );
}

export default Gallery;

import {
  Box,
  ImageList, ImageListItem, Typography,
} from '@mui/material';

import React from 'react';
import { useGalleryImage } from '../../hooks/useGalleryImage';
import MagazineDialog from '../../components/MagazineDialog';

function Gallery() {
  const { galleryImages } = useGalleryImage();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const handleImageClick = (_index) => {
    setIndex(_index);
    setOpenDialog(true);
  };
  return (
    <div>
      <MagazineDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        imageList={galleryImages}
        index={index}
      />
      <Typography>Gallery</Typography>
      <Box sx={{ width: '100%', overflowY: 'scroll' }}>
        <ImageList
          variant="masonry"
          cols={8}
          gap={8}
        >
          {galleryImages.map((item, _index) => (
            <ImageListItem key={item.id} cols={item.cols || 1} rows={item.rows || 1}>
              <img
                src={item.url}
                alt={`${item.title}&fit=crop&auto=format&dpr=2 2x`}
                loading="lazy"
                onClick={() => handleImageClick(_index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') { handleImageClick(item.id); }
                }}
                // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
                role="button"
                tabIndex="0"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>

    </div>
  );
}

export default Gallery;

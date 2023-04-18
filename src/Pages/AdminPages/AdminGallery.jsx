import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { ImageCardDnD } from '../../components/ImageCardDnD';
import { useGalleryImage } from '../../hooks/useGalleryImage';
import SelectableImage from '../../components/SelectableImage';
import DataSource from '../../api/DataSource';

function AdminGallery() {
  const [fileDialogOpen, setFileDialogOpen] = useState(false);
  const [loading] = useState(false);
  const { galleryImages } = useGalleryImage();
  const handleDialogClose = () => setFileDialogOpen(false);

  const addImageToResource = ({ image, checked }) => {
    const updatedImage = { ...image, gallery: checked };
    return updatedImage;
  };
  const checkIfImageExists = (image) => {
    if (image.gallery) return true;
    return false;
  };

  const removeImageFromGallery = (image) => {
    const updated = { ...image, gallery: false };
    DataSource.updateImage({ path: DataSource.getUserImagePath(), updatedImage: updated });
  };
  return (
    <div>
      <Grid container spacing={2} alignItems="center" style={{ marginTop: 2 }}>
        {galleryImages.map((image, index) => (

          <Grid item xs={12} lg={4} md={4} key={image.id}>
            <ImageCardDnD
              index={index}
              image={image}
              // moveCard={moveCard}
              // updateCard={updateCard}
              // imagePath={DataSource.getUserImagePath()}
              // updateImage={
              //   () => {}
              // }
              deleteImage={(_image) => removeImageFromGallery(_image)}
              // makeCoverImage={(e) => handleChangeCover(e.target.name, e.target.checked, image)}
              // isCover={magazine?.cover?.id === image.id}
            />
          </Grid>

        ))}
      </Grid>
      <LoadingButton
        loading={loading}
        variant="outlined"
        onClick={() => setFileDialogOpen(true)}
      >
        Select Images

      </LoadingButton>
      <Dialog
        fullScreen
        open={fileDialogOpen}
        onClose={(handleDialogClose)}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          Select Image For Gallery
        </DialogTitle>
        <DialogContent>
          <SelectableImage
            resourceId="gallery"
            addImageToResource={addImageToResource}
            checkIfImageExists={checkIfImageExists}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AdminGallery;

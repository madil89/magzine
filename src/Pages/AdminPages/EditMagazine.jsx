import {
  Grid, Typography, TextareaAutosize,
  Dialog, DialogTitle, DialogContent, DialogActions, Button,
} from '@mui/material';

import { LoadingButton } from '@mui/lab';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import firestore from '../../api/firestore';
import ImageCard from '../../components/ImageCard';
import DataSource from '../../api/DataSource';
import SelectableImage from '../../components/SelectableImage';
import { useMagazineImage } from '../../hooks/useMagazineImages';

function EditMagazine() {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [fileDialogOpen, setFileDialogOpen] = useState(false);
  const { magazine, magazineImage, updateMagazin } = useMagazineImage(params.id);
  const handleChangeEditorNote = (e) => {
    const updated = {
      ...magazine,
      [e.target.name]: e.target.value,
    };
    updateMagazin(updated);
  };

  const handleChangeCover = (name, value, image) => {
    const updated = {
      ...magazine,
      cover: value ? { url: image.url, id: image.id } : null,
    };
    updateMagazin(updated);
    firestore.updateMagazine(params.id, updated);
  };

  const removeImageFromMagazine = (_image) => {
    const updated = {
      ..._image,
      magazine_id: _image.magazine_id.filter((id) => id !== params.id),
    };
    console.log('updated image is ', updated);
    DataSource.updateImage({ path: DataSource.getUserImagePath(), updatedImage: updated });
  };
  const handleSaveInfo = async () => {
    setLoading(true);
    await firestore.updateMagazine(params.id, magazine);
    setLoading(false);
  };

  const handleDialogClose = () => setFileDialogOpen(false);
  return !magazine ? <div>Loading...</div> : (
    <div>
      <Typography variant="h2">{magazine.name}</Typography>
      <TextareaAutosize
        minRows={2}
        name="editorNote"
        placeholder="Editor Note"
        value={magazine.editorNote}
        style={{
          width: '100%', marginBottom: '10px', marginRight: '10px',
        }}
        onChange={(e) => handleChangeEditorNote(e)}
      />

      <Grid container spacing={2} style={{ marginTop: 2 }}>
        {magazineImage.map((image) => (
          <Grid item xs={12} lg={4} md={6} key={image.url}>
            <ImageCard
              image={image}
              imagePath={DataSource.getUserImagePath()}
              updateImage={
                ({ updatedImage }) => console.log(updatedImage)
              }
              deleteImage={(_image) => removeImageFromMagazine(_image)}
              makeCoverImage={(e) => handleChangeCover(e.target.name, e.target.checked, image)}
              isCover={magazine?.cover?.id === image.id}

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
      <LoadingButton
        loading={loading}
        variant="contained"
        onClick={handleSaveInfo}
        style={{ marginTop: '10px' }}
      >
        Save

      </LoadingButton>
      <Dialog
        fullScreen
        open={fileDialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          Select Image For Magazine
        </DialogTitle>
        <DialogContent>
          <SelectableImage magazineId={magazine.id} />
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

export default EditMagazine;

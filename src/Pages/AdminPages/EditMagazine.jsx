import {
  Grid, Typography, TextareaAutosize,
  Dialog, DialogTitle, DialogContent, DialogActions, Button,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import firestore from '../../api/firestore';
import DataSource from '../../api/DataSource';
import SelectableImage from '../../components/SelectableImage';
import { useMagazineImage } from '../../hooks/useMagazineImages';
import { ImageCardDnD } from '../../components/ImageCardDnD';

function EditMagazine() {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [fileDialogOpen, setFileDialogOpen] = useState(false);
  const { magazine, magazineImage, updateMagazin } = useMagazineImage(params.id);
  const [sortedMagazineImage, setSortedMagazineImage] = useState([...magazineImage]);
  const handleChangeEditorNote = (e) => {
    const updated = {
      ...magazine,
      [e.target.name]: e.target.value,
    };
    updateMagazin(updated);
  };

  React.useEffect(() => {
    setSortedMagazineImage([...magazineImage]);
  }, [magazineImage]);

  const handleChangeCover = (name, value, image) => {
    const updated = {
      ...magazine,
      cover: value ? { url: image.url, id: image.id } : null,
    };
    updateMagazin(updated);
    firestore.updateMagazine(params.id, updated);
  };

  const checkIfImageExists = (image) => {
    if (image.magazine_id) {
      const index = image.magazine_id.findIndex((id) => id === magazine.id);
      if (index !== -1) return true;
      return false;
    }
    return false;
  };
  const removeImageFromMagazine = (_image) => {
    const updated = {
      ..._image,
      magazine_id: _image.magazine_id.filter((id) => id !== params.id),
    };
    DataSource.updateImage({ path: DataSource.getUserImagePath(), updatedImage: updated });
  };
  const handleSaveInfo = async () => {
    setLoading(true);
    await firestore.updateMagazine(params.id, magazine);
    setLoading(false);
  };

  const handleDialogClose = () => setFileDialogOpen(false);

  const moveCard = (dragIndex, hoverIndex) => {
    const tempArray = [...sortedMagazineImage];
    const temp = tempArray[dragIndex];
    tempArray[dragIndex] = tempArray[hoverIndex];
    tempArray[hoverIndex] = temp;
    setSortedMagazineImage(tempArray);
  };

  const updateCard = async () => {
    sortedMagazineImage.forEach(async (img, index) => {
      await DataSource.updateImage({
        path: DataSource.getUserImagePath(),
        updatedImage: { ...img, sort_order: { ...img.sort_order, [magazine.id]: index } },
      });
    });
  };

  const addImageToResource = ({ image, checked, resourceId }) => {
    let updatedImage = { ...image };
    if (checked) {
      updatedImage = {
        ...updatedImage,
        magazine_id: [...updatedImage.magazine_id, resourceId],
        sort_order: { ...updatedImage.sort_order, [resourceId]: 1 },
      };
    } else {
      updatedImage = {
        ...updatedImage,
        magazine_id: [...updatedImage.magazine_id.filter((id) => id !== resourceId)],
        sort_order: { ...updatedImage.sort_order, [resourceId]: null },
      };

      delete updatedImage?.sort_order?.[resourceId];
    }
    return updatedImage;
  };

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
      <Grid container spacing={2} alignItems="center" style={{ marginTop: 2 }}>
        {sortedMagazineImage.map((image, index) => (

          <Grid item xs={12} lg={4} md={4} key={image.id}>
            <ImageCardDnD
              index={index}
              image={image}
              moveCard={moveCard}
              updateCard={updateCard}
              imagePath={DataSource.getUserImagePath()}
              updateImage={
                () => {}
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
          <SelectableImage
            resourceId={magazine.id}
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

export default EditMagazine;

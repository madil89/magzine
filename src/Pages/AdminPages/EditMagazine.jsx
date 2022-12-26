import {
  Grid, Typography, Box, TextField,
} from '@mui/material';

import { LoadingButton } from '@mui/lab';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import firebaseStorage from '../../api/firebaseStorage';
import firestore from '../../api/firestore';

function EditMagazine() {
  const [magazine, setMagazine] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileRef = React.useRef();
  const params = useParams();

  React.useEffect(() => {
    firestore.getMagazineById(params.id).then((result) => {
      setMagazine(result);
    });
  }, []);

  const onFileSelect = (selectedFiles) => {
    setLoading(true);
    const propmiseArray = [...selectedFiles].map((file) => firebaseStorage
      .uploadFileImage(params.id, file));
    Promise.all(propmiseArray).then(async (response) => {
      const updatedMagazine = { ...magazine, images: [...magazine.images, ...response] };
      await firestore.updateMagazine(params.id, updatedMagazine);
      setLoading(false);
      setMagazine((prev) => ({ ...prev, images: [...prev.images, ...response] }));
    });
  };

  const handleChangeDescription = (e, index) => {
    const updated = {
      ...magazine,
      images: magazine.images.map((item, i) => {
        if (index === i) {
          return { ...item, [e.target.name]: e.target.value };
        }
        return item;
      }),
    };
    setMagazine(updated);
  };

  const handleChangeEditorNote = (e) => {
    const updated = {
      ...magazine,
      [e.target.name]: e.target.value,
    };
    setMagazine(updated);
  };

  const handleSaveInfo = async () => {
    setLoading(true);
    await firestore.updateMagazine(params.id, magazine);
    setLoading(false);
  };
  return !magazine ? <div>Loading...</div> : (
    <div>
      <Typography variant="h2">{magazine.name}</Typography>
      <TextField
        name="editorNote"
        label="Editor Note"
        value={magazine.editorNote}
        style={{ width: '100%', marginBottom: '10px' }}
        onChange={(e) => handleChangeEditorNote(e)}
      />
      <input
        hidden
        type="file"
        ref={fileRef}
        multiple
        onChange={(e) => onFileSelect(e.target.files)}
      />
      <LoadingButton loading={loading} variant="outlined" onClick={() => fileRef.current.click()}>Select Images to Upload</LoadingButton>
      <Grid container spacing={2} style={{ marginTop: 2 }}>
        {magazine.images.map((image, index) => (
          <Grid item xs={12} lg={4} md={6} key={image.url}>
            <Box>
              <img
                src={image.url}
                alt="magazine"
                width="100%"
              />
              <TextField
                name="description"
                value={image.description}
                style={{ width: '100%' }}
                onChange={(e) => handleChangeDescription(e, index)}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
      <LoadingButton
        loading={loading}
        variant="contained"
        onClick={handleSaveInfo}
        style={{ marginTop: '10px' }}
      >
        Save

      </LoadingButton>
    </div>
  );
}

export default EditMagazine;

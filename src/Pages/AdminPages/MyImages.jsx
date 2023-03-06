import { LoadingButton } from '@mui/lab';
import {
  Card, CardActions, Grid,
} from '@mui/material';

import React, { useState } from 'react';

import DataSource from '../../api/DataSource';
import firebaseStorage from '../../api/firebaseStorage';
import ImageCard from '../../components/ImageCard';
import { useUserImage } from '../../hooks/useUserImage';

function MyImages() {
  const fileRef = React.useRef();
  const [loading, setLoading] = useState(false);
  const [userImages, setUserImages] = useUserImage();

  const addUserIdToImages = (images) => images.map((image) => (
    { userId: DataSource.getUserId(), ...image }));

  const onFileSelect = (selectedFiles) => {
    setLoading(true);
    const uploadedImages = [...selectedFiles].map((file) => firebaseStorage
      .uploadUserImages(DataSource.getUserId(), file));

    Promise.all(uploadedImages)
      .then((images) => addUserIdToImages(images))
      .then((imagesWithUserId) => DataSource.addUserImages(imagesWithUserId))
      .then((updatedImages) => {
        setLoading(false);
        setUserImages((prevImages) => ([...prevImages, ...updatedImages]));
      });
  };

  return (
    <div>
      <Grid container spacing={2} style={{ marginTop: 2 }}>
        {userImages.map((image) => (
          <Grid item key={image.id}>
            <ImageCard image={image} />
          </Grid>
        ))}

        <Grid item>
          <Card sx={{ width: 200 }} variant="outlined">
            <CardActions>
              <LoadingButton loading={loading} size="small" onClick={() => fileRef.current.click()}>Add Image</LoadingButton>
              <input
                hidden
                type="file"
                ref={fileRef}
                multiple
                onChange={(e) => onFileSelect(e.target.files)}
              />
            </CardActions>
          </Card>
        </Grid>
      </Grid>

    </div>
  );
}

export default MyImages;

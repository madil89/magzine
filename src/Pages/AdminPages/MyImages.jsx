/* eslint-disable no-alert */
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
  const [userImages] = useUserImage();

  const addUserIdToImages = (images) => images.map((image) => (
    { ...image, userId: DataSource.getUserId() }));

  const addImageMetadata = (images) => images.map((image) => (
    {
      ...image, tags: ['user_image'], header: '', description: '', magazine_id: [], sort_order: {},
    }));

  const onFileSelect = (selectedFiles) => {
    setLoading(true);
    const uploadedImages = [...selectedFiles].map((file) => firebaseStorage
      .uploadUserImages(DataSource.getUserId(), file));

    Promise.all(uploadedImages)
      .then((images) => addUserIdToImages(images))
      .then((images) => addImageMetadata(images))
      .then((imagesWithMetadata) => DataSource.addUserImages(imagesWithMetadata))
      .then(() => {
        setLoading(false);
        // setUserImages((prevImages) => ([...prevImages, ...updatedImages]));
      });
  };

  const handleImageDelete = (_image) => {
    if (_image.magazine_id && _image.magazine_id.length > 0) {
      alert('image can not be deleted! because it is used in magazine');
      return;
    }
    DataSource.deleteImage(_image);
  };
  return (
    <div>
      <Grid container spacing={2} style={{ marginTop: 2 }}>
        {userImages.map((image) => (
          <Grid item key={image.id}>
            <ImageCard
              image={image}
              imagePath={DataSource.getUserImagePath()}
              updateImage={
                ({ updatedImage }) => DataSource.updateImage(
                  { path: DataSource.getUserImagePath(), updatedImage },
                )
              }
              deleteImage={(_image) => handleImageDelete(_image)}
            />
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

import {
  Card, CardActions, CardContent, CardMedia, Checkbox, Chip, Grid, Typography,
} from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import { useImage } from '../hooks/useImage';

function SelectableImage({ resourceId, addImageToResource, checkIfImageExists }) {
  const { images, updateImage } = useImage();

  const handleUpdateImage = ({ image, checked }) => {
    const updatedImage = addImageToResource({ image, checked, resourceId });
    updateImage({ updatedImage });
  };

  return (
    <div>
      <Grid container spacing={2} style={{ marginTop: 2 }}>
        {images.map((image) => (
          <Grid item key={image.id}>
            <Card sx={{ width: 300 }} variant="outlined">

              <CardMedia
                component="img"
                sx={{ height: 180 }}
                image={image.url}
                alt="Live from space album cover"
              />
              <CardContent>

                <Typography gutterBottom variant="h5" component="div">
                  {image.header}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {image.description}
                </Typography>
                <div style={{ marginTop: '10px' }}>
                  {image.tags && image.tags.map((tag) => <Chip key={tag} label={tag} />)}
                </div>

              </CardContent>

              <CardActions>
                <Checkbox
                  checked={checkIfImageExists(image)}
                  onChange={(e) => handleUpdateImage({
                    image,
                    checked: e.target.checked,
                  })}
                />

              </CardActions>

            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

SelectableImage.propTypes = {
  resourceId: PropTypes.string.isRequired,
  addImageToResource: PropTypes.func.isRequired,
  checkIfImageExists: PropTypes.func.isRequired,
};
export default SelectableImage;

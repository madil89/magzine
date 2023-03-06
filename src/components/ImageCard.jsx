import {
  Card, CardActions, CardContent, CardMedia, IconButton, TextareaAutosize, Typography,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useState } from 'react';
import DataSource from '../api/DataSource';

const RightIconButton = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

function ImageCard({ image }) {
  const [editing, setEditing] = useState(false);
  const [description, setDescription] = useState(image.description);

  const handleSave = () => {
    DataSource.updateImageDescription(image.id, description);
    setEditing(false);
  };
  return (
    <Card sx={{ width: 300 }} variant="outlined">
      <CardMedia
        component="img"
        sx={{ height: 180 }}
        image={image.url}
        alt="Live from space album cover"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Header
        </Typography>
        {editing
          ? (
            <TextareaAutosize
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              label="Standard"
              variant="standard"
              style={{ width: '100%', height: '70px' }}
            />
          ) : (
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          )}
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>

        {editing ? (
          <RightIconButton onClick={() => handleSave()}>
            <SaveIcon />
          </RightIconButton>
        ) : (
          <RightIconButton onClick={() => setEditing(true)}>
            <EditIcon />
          </RightIconButton>
        )}

      </CardActions>
    </Card>
  );
}
ImageCard.propTypes = {
  image: PropTypes.shape({
    url: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
};
export default ImageCard;

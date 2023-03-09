import {
  Card, CardActions, CardContent, CardMedia, IconButton, TextareaAutosize, TextField,
} from '@mui/material';
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

function EditableImageCard({ image, setEditing }) {
  const [imageMetaData, setimageMetaData] = useState({ ...image, header: image.header ? image.header : '' });
  const [newTags, setNewTags] = useState(image.tags.join(','));
  const handleSave = () => {
    const newTagsArray = newTags.split(',');
    DataSource.updateImageMetadata(
      image.id,
      { ...imageMetaData, tags: newTagsArray },
    );
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

        <TextareaAutosize
          value={imageMetaData.header}
          onChange={(e) => setimageMetaData({ ...imageMetaData, header: e.target.value })}
          placeholder="Add Header"
          variant="standard"
          minRows={2}
          style={{ width: '100%' }}
        />
        <TextareaAutosize
          value={imageMetaData.description}
          onChange={(e) => setimageMetaData({ ...imageMetaData, description: e.target.value })}
          placeholder="Add Description"
          variant="standard"
          minRows={3}
          style={{ width: '100%' }}
        />

        <TextField style={{ width: '100%' }} label="tags" value={newTags} onChange={(e) => setNewTags(e.target.value)} />
      </CardContent>
      <CardActions disableSpacing>
        <RightIconButton onClick={() => handleSave()}>
          <SaveIcon />
        </RightIconButton>

      </CardActions>
    </Card>
  );
}
EditableImageCard.propTypes = {
  image: PropTypes.shape({
    url: PropTypes.string,
    description: PropTypes.string,
    header: PropTypes.string,
    id: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  setEditing: PropTypes.func.isRequired,
};
export default EditableImageCard;

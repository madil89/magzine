import {
  Card, CardActions, CardContent,
  CardMedia, Checkbox, Chip, FormControlLabel, IconButton, Typography,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { Delete } from '@mui/icons-material';

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

function SimpleImageCard({
  image, setEditing, deleteImage, makeCoverImage,
  isCover,
}) {
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
          {image.header}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {image.description}
        </Typography>
        <div style={{ marginTop: '10px' }}>
          {image.tags && image.tags.map((tag) => <Chip key={tag} label={tag} />)}
        </div>

        {makeCoverImage && (
        <div>
          <FormControlLabel
            control={(
              <Checkbox
                onChange={(e) => makeCoverImage(e)}
                checked={isCover}
              />
          )}
            label="Make Cover"
            name="isCover"
          />

        </div>
        )}

      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton onClick={() => setEditing(true)}>
          <EditIcon />
        </IconButton>
        <RightIconButton onClick={() => deleteImage(image)}>
          <Delete />
        </RightIconButton>

      </CardActions>
      <CardActions />

    </Card>
  );
}
SimpleImageCard.propTypes = {
  image: PropTypes.shape({
    url: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.string,
    header: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  setEditing: PropTypes.func.isRequired,
  deleteImage: PropTypes.func.isRequired,
  makeCoverImage: PropTypes.func,
  isCover: PropTypes.bool,
};
SimpleImageCard.defaultProps = {
  makeCoverImage: null,
  isCover: false,
};
export default SimpleImageCard;

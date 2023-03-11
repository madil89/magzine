import PropTypes from 'prop-types';
import { useState } from 'react';
import EditableImageCard from './EditableImageCard';
import SimpleImageCard from './SimpleImageCard';

function ImageCard({ image }) {
  const [editing, setEditing] = useState(false);

  return (
    <div>
      {editing ? <EditableImageCard image={image} setEditing={setEditing} />
        : <SimpleImageCard image={image} setEditing={setEditing} /> }
    </div>

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

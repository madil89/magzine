import PropTypes from 'prop-types';
import { useState } from 'react';
import EditableImageCard from './EditableImageCard';
import SimpleImageCard from './SimpleImageCard';

function ImageCard({
  image, updateImage, deleteImage, makeCoverImage, isCover,
}) {
  const [editing, setEditing] = useState(false);

  return (
    <div>
      {editing ? (
        <EditableImageCard
          image={image}
          setEditing={setEditing}
          updateImage={updateImage}
          makeCoverImage={makeCoverImage}
          isCover={isCover}
        />
      )
        : (
          <SimpleImageCard
            image={image}
            setEditing={setEditing}
            updateImage={updateImage}
            deleteImage={deleteImage}
            makeCoverImage={makeCoverImage}
            isCover={isCover}
          />
        ) }
    </div>
  );
}
ImageCard.propTypes = {
  image: PropTypes.shape({
    url: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
  updateImage: PropTypes.func.isRequired,
  deleteImage: PropTypes.func.isRequired,
  makeCoverImage: PropTypes.func,
  isCover: PropTypes.bool,
};
ImageCard.defaultProps = {
  makeCoverImage: null,
  isCover: false,
};
export default ImageCard;

import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay, bindKeyboard } from 'react-swipeable-views-utils';

const EnhancedSwipeableViews = bindKeyboard(autoPlay((SwipeableViews)));

function Image({ imageList }) {
  return (
    <div>
      <EnhancedSwipeableViews enableMouseEvents interval={3000}>
        {imageList.map((image) => (
          <div key={image.id} style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <img
              src={image.src}
              alt={image.alt}
              style={{ marginTop: 16, height: '72vh', maxWidth: '100%' }}
            />
          </div>
        ))}
      </EnhancedSwipeableViews>

      <Box marginTop={1} marginBottom={10} sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        {
        imageList.map((image) => (
          <img
            src={image.src}
            style={{ marginTop: 16, marginRight: 16 }}
            height="100vh"
            alt="random"
            key={image.id}
            // onClick={() => navigate(`/magazines/${magazine.id}`)}
          />
        ))
      }
      </Box>
    </div>

  );
}

Image.propTypes = {
  imageList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};
export default Image;

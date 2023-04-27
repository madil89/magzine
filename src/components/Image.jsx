import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay, bindKeyboard } from 'react-swipeable-views-utils';

const EnhancedSwipeableViews = bindKeyboard(autoPlay((SwipeableViews)));

function Image({ imageList, index }) {
  const [currentIndex, setCurrentIndex] = React.useState(index);
  return (
    <div style={{ background: 'black' }}>
      <EnhancedSwipeableViews enableMouseEvents interval={3000} index={currentIndex}>
        {imageList.map((image) => (
          <div key={image.id} style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <img
              src={image.url}
              alt={image.alt}
              style={{ marginTop: 16, height: '72vh', maxWidth: '100%' }}
            />
          </div>
        ))}
      </EnhancedSwipeableViews>

      <Box marginTop={1} marginBottom={10} sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        {
        imageList.map((image, _index) => (
          /* eslint-disable-next-line jsx-a11y/click-events-have-key-events,
          jsx-a11y/no-noninteractive-element-interactions */
          <img
            src={image.url}
            style={{ marginTop: 16, marginRight: 16 }}
            height="100vh"
            alt="random"
            key={image.id}
            onClick={() => setCurrentIndex(_index)}
          />
        ))
      }
      </Box>
    </div>

  );
}

Image.defaultProps = {
  index: 0,
};

Image.propTypes = {
  imageList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      alt: PropTypes.string,
      // author: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  index: PropTypes.number,
};
export default Image;

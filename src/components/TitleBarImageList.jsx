/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import PropTypes from 'prop-types';

export default function TitlebarImageList({ onImageSelect, images }) {
  return (
    <ImageList cols={3} sx={{ maxWidth: '100%', marginLeft: 1, height: '80vh' }}>
      {images.map((item) => (
        <ImageListItem key={item.id}>
          <img
            src={`${item.url}`}
            srcSet={`${item.url}`}
            alt={item.title}
            loading="lazy"
            onClick={() => onImageSelect(item)}
            onKeyDown={() => onImageSelect(item)}
          />
          <ImageListItemBar
            title={item.title}
            subtitle={item.author}
            actionIcon={(
              <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`info about ${item.title}`}
              >
                <InfoIcon />
              </IconButton>
            )}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

TitlebarImageList.propTypes = {
  onImageSelect: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      // alt: PropTypes.string.isRequired,
      // title: PropTypes.string.isRequired,
      // author: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

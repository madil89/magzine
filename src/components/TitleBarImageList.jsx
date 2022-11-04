/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import PropTypes from 'prop-types';
// import assetManager from '../assets/assetManager';
import { useSelector } from 'react-redux';

export default function TitlebarImageList({ onImageSelect }) {
  const magazines = useSelector((state) => state.magazine[0]);
  return (
    <ImageList sx={{ width: '100%', marginLeft: 1 }}>
      {magazines.images.map((item) => (
        <ImageListItem key={item.id}>
          <img
            src={`${item.src}?w=248&fit=crop&auto=format`}
            srcSet={`${item.src}?w=248&fit=crop&auto=format&dpr=2 2x`}
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
};

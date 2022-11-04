/* eslint-disable max-len */
import { Box, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import assetManager from '../assets/initMagazine';

function PreviousMagazine() {
  const navigate = useNavigate();
  return (
    <div style={{ width: '100%', overflowX: 'auto' }}>
      <Typography variant="h4" sx={{ marginTop: 10 }}>
        Previous Magazines
      </Typography>
      <Box marginTop={1} marginBottom={10} sx={{ display: 'flex' }}>
        {
        assetManager.images.map((image) => (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
          <img
            src={image.src}
            style={{ marginTop: 16, marginRight: 16 }}
            height={250}
            alt="random"
            key={image.id}
            onClick={() => navigate(`/magazine/${image.id}`)}
          />
        ))
      }
      </Box>

    </div>
  );
}

export default PreviousMagazine;

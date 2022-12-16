/* eslint-disable max-len */
import { Box, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PreviousMagazine() {
  const magazines = useSelector((state) => state.magazine);
  const navigate = useNavigate();
  return (
    <div style={{ width: '100%', overflowX: 'auto' }}>
      <Typography variant="h4" sx={{ marginTop: 10 }}>
        Previous Magazines
      </Typography>
      <Box marginTop={1} marginBottom={10} sx={{ display: 'flex' }}>
        {
        magazines.map((magazine) => (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
          <img
            src={magazine.mainImage.src}
            style={{ marginTop: 16, marginRight: 16 }}
            height={250}
            alt="random"
            key={magazine.id}
            onClick={() => navigate(`/magazines/${magazine.id}`)}
          />
        ))
      }
      </Box>

    </div>
  );
}

export default PreviousMagazine;

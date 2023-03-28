/* eslint-disable max-len */
import { Box, Typography } from '@mui/material';
import React from 'react';
// import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

function PreviousMagazine({ onSelected, resource }) {
  // const magazines = useSelector((state) => state.magazine);

  return (
    <div style={{ width: '100%', overflowX: 'auto' }}>

      <Box marginTop={1} marginBottom={10} sx={{ display: 'flex' }}>
        {
        resource.map((magazine) => (

          magazine.cover ? (

            <div
              style={{ cursor: 'pointer' }}
              key={magazine.id}
              onClick={() => onSelected(`${magazine.id}`)}
              role="button"
              tabIndex={0}
              onKeyDown={() => {}}
            >
              <img
                src={magazine.cover.url}
                style={{ marginTop: 16, marginRight: 16 }}
                height={250}
                alt="random"
              />
              <Typography>{magazine.name}</Typography>
            </div>

          )
            : (
              <AddAPhotoIcon
                key={magazine.id}
                sx={{ width: 100, height: 100 }}
                onClick={() => onSelected(`${magazine.id}`)}
              />
            )
        ))
      }
      </Box>
    </div>
  );
}

PreviousMagazine.propTypes = {
  onSelected: PropTypes.func.isRequired,
  resource: PropTypes.arrayOf(
    PropTypes.shape({
      cover: PropTypes.shape({
        url: PropTypes.string.isRequired,
      }),
    }),
  ).isRequired,
};
export default PreviousMagazine;

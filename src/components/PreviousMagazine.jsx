/* eslint-disable max-len */
import { Box } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

function PreviousMagazine({ onSelected }) {
  const magazines = useSelector((state) => state.magazine);

  return (
    <div style={{ width: '100%', overflowX: 'auto' }}>

      <Box marginTop={1} marginBottom={10} sx={{ display: 'flex' }}>
        {
        magazines.map((magazine) => (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
          <img
            key={magazine.images[0].url}
            src={magazine.images[0].url}
            style={{ marginTop: 16, marginRight: 16 }}
            height={250}
            alt="random"
            onClick={() => onSelected(`${magazine.id}`)}
          />
        ))
      }
      </Box>
    </div>
  );
}

PreviousMagazine.propTypes = {
  onSelected: PropTypes.func.isRequired,
};
export default PreviousMagazine;

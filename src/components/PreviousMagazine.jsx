/* eslint-disable max-len */
import { Box } from '@mui/material';
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

          magazine.images.length > 0 ? (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
            <img
              key={magazine.id}
              src={magazine.images[0].url}
              style={{ marginTop: 16, marginRight: 16 }}
              height={250}
              alt="random"
              onClick={() => onSelected(`${magazine.id}`)}
            />
          )
            : <AddAPhotoIcon sx={{ width: 100, height: 100 }} />
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
      images: PropTypes.arrayOf({
        url: PropTypes.string.isRequired,
      }),
    }),
  ).isRequired,
};
export default PreviousMagazine;

import React from 'react';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { Typography } from '@mui/material';
import PropTypes from 'prop-types';

function Cover({ magazine, onSelected }) {
  return (
    <div>
      { magazine.cover ? (

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
        )}
    </div>
  );
}

Cover.propTypes = {
  onSelected: PropTypes.func.isRequired,
  magazine: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    cover: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
export default Cover;

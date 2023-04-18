/* eslint-disable max-len */
import { Box } from '@mui/material';
import React from 'react';
// import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Cover from './Cover';
import withDeleteButton from './withDelete';

const CoverWithDeleteButton = withDeleteButton(Cover);
function PreviousMagazine({
  onSelected, resource, withDelete, handleMagazineDelete,
}) {
  return (
    <div style={{ width: '100%', overflowX: 'auto' }}>

      <Box marginTop={1} marginBottom={10} sx={{ display: 'flex' }}>
        {
        resource.map((magazine) => (
          withDelete ? (
            <CoverWithDeleteButton
              key={magazine.id}
              onSelected={onSelected}
              magazine={magazine}
              onDelete={handleMagazineDelete}
            />
          )
            : <Cover key={magazine.id} onSelected={onSelected} magazine={magazine} />
        ))

      }
      </Box>
    </div>
  );
}

PreviousMagazine.defaultProps = {
  withDelete: false,
  handleMagazineDelete: () => {
    console.log('delete funtion is not provided');
  },
};
PreviousMagazine.propTypes = {
  onSelected: PropTypes.func.isRequired,
  handleMagazineDelete: PropTypes.func,
  withDelete: PropTypes.bool,
  resource: PropTypes.arrayOf(
    PropTypes.shape({
      cover: PropTypes.shape({
        url: PropTypes.string.isRequired,
      }),
    }),
  ).isRequired,
};
export default PreviousMagazine;

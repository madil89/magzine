import { Typography } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

function EditorNote({ editorNote }) {
  return (
    <>
      <Typography variant="h3" sx={{ marginTop: 2 }}>
        Editor Note
      </Typography>
      <Typography>
        {editorNote}
        {/* Sometimes Words hold meaning deeper than the listener or reader can comprehend.
        To make people understand your meaning, you have to emphasize some words or make
        them outstanding.
        Typography has some magic that can make things easier for readers.
        So this month we have selected typography as the theme of the magazine.
        Beautiful words with some amazing artwork.
         Hope you all enjoy going through this journey. */}

      </Typography>
    </>
  );
}
EditorNote.propTypes = {
  editorNote: PropTypes.string.isRequired,
};

export default EditorNote;

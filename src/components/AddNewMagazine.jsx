import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';
import firestore from '../api/firestore';

export default function AddNewMagazine({ open, setOpen, handleMagazineCreated }) {
  const [name, setName] = React.useState('');
  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateNewMagazine = async () => {
    const id = await firestore.createNewMagazine({ name, images: [] });
    setOpen(false);
    handleMagazineCreated(id);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Magazine</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a new magazine, please enter the name.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Magazine Name"
            type="name"
            fullWidth
            variant="standard"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreateNewMagazine}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
AddNewMagazine.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  handleMagazineCreated: PropTypes.func.isRequired,
};

import * as React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Image from './Image';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function MagazineDialog({
  open, onClose, imageList, index,
}) {
  const dialogRef = React.useRef();
  const handleClose = () => {
    onClose();
  };

  return (
    <div>

      <Dialog
        ref={dialogRef}
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative', background: 'black' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>

          </Toolbar>
        </AppBar>
        <Image imageList={imageList} index={index} />
      </Dialog>
    </div>
  );
}
MagazineDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  imageList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      // alt: PropTypes.string.isRequired,
      // title: PropTypes.string.isRequired,
      // author: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  index: PropTypes.number.isRequired,
};

import React from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Grid } from '@mui/material';
import SwipeableViews from 'react-swipeable-views';
import { bindKeyboard } from 'react-swipeable-views-utils';
import PropTypes from 'prop-types';
import TitlebarImageList from './TitleBarImageList';
import MagazineDialog from './MagazineDialog';
import EditorNote from './EditorNote';
import { useMagazineImage } from '../hooks/useMagazineImages';
// import Carousal from './Carousal';
const EnhancedSwipeableViews = bindKeyboard(SwipeableViews);

function CurrentMagazine({ currentMagazine }) {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [index, setIndex] = React.useState(0);

  const { magazineImage, loadMagazine } = useMagazineImage(currentMagazine.id);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % magazineImage.length);
    }, 10000);
    return () => {
      clearInterval(interval);
    };
  }, [magazineImage]);

  React.useEffect(() => {
    loadMagazine(currentMagazine.id);
  }, [currentMagazine]);
  const getImageIndex = (image) => {
    const imageIndex = magazineImage.findIndex((item) => item.id === image.id);
    return imageIndex;
  };

  const handleSlideChange = (currentIndex) => {
    setIndex(currentIndex);
  };

  const handleImageClick = () => {
    setOpenDialog(true);
  };

  return (
    <div>
      <MagazineDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        imageList={magazineImage}
        index={index}
      />
      <Grid container marginTop={3} sx={{ display: 'flex' }} justifyContent="center">
        <Grid item xs={12} md={8}>
          <EnhancedSwipeableViews
            index={index}
            enableMouseEvents
            interval={3000}
            onChangeIndex={handleSlideChange}
          >
            {magazineImage.map((image) => (
              <div
                style={{ display: 'flex', justifyContent: 'center', width: '100%' }}
                key={image.id}
                onClick={() => handleImageClick(image.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') { handleImageClick(image.id); }
                }}
                role="button"
                tabIndex="0"
              >
                <img
                  src={image.url}
                  style={{ marginTop: 16, height: '80vh', maxWidth: '100%' }}
                  alt="random"
                />
              </div>
            ))}
          </EnhancedSwipeableViews>

        </Grid>
        <Grid item xs={2} md={4}>
          {matches
        && (
        <TitlebarImageList
          images={magazineImage}
          onImageSelect={(image) => setIndex(getImageIndex(image))}
        />
        )}

        </Grid>

      </Grid>
      <EditorNote editorNote={currentMagazine.editorNote || ''} />
    </div>
  );
}

CurrentMagazine.propTypes = {
  currentMagazine: PropTypes.shape({
    id: PropTypes.string.isRequired,
    editorNote: PropTypes.string.isRequired,
  }).isRequired,
};

export default CurrentMagazine;

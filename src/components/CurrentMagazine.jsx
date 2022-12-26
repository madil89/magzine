/* eslint-disable no-console */
import React from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
import { bindKeyboard } from 'react-swipeable-views-utils';
import TitlebarImageList from './TitleBarImageList';
import MagazineDialog from './MagazineDialog';
// import Carousal from './Carousal';
const EnhancedSwipeableViews = bindKeyboard(SwipeableViews);

function CurrentMagazine() {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const magazines = useSelector((state) => state.magazine);
  const [currentMagazine, setCurrentMagazine] = React.useState(magazines[0]);
  const params = useParams();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % currentMagazine.images.length);
    }, 10000);
    return () => {
      clearInterval(interval);
    };
  }, [currentMagazine.images]);

  React.useEffect(() => {
    const { id } = params;
    if (id) {
      console.log('magazines are ', magazines);
      const mag = magazines.find((mg) => mg.id === id);
      console.log('selected magazine ', mag);
      if (mag) setCurrentMagazine(mag);
      goToTop();
    } else {
      setCurrentMagazine(magazines[0]);
    }
  }, [currentMagazine, magazines, params]);
  const getImageIndex = (image) => {
    const imageIndex = currentMagazine.images.findIndex((item) => item.id === image.id);
    return imageIndex;
  };

  const handleSlideChange = (currentIndex) => {
    setIndex(currentIndex);
  };

  const handleImageClick = (imageId) => {
    console.log('image id is ', imageId);
    setOpenDialog(true);
  };

  return (
    <div>
      <MagazineDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        imageList={currentMagazine.images}
      />
      <Grid container marginTop={3} sx={{ display: 'flex' }} justifyContent="center">
        <Grid item xs={12} md={8}>
          <EnhancedSwipeableViews
            index={index}
            enableMouseEvents
            interval={3000}
            onChangeIndex={handleSlideChange}
          >
            {currentMagazine.images.map((image) => (
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
          images={currentMagazine.images}
          onImageSelect={(image) => setIndex(getImageIndex(image))}
        />
        )}

        </Grid>

      </Grid>
    </div>
  );
}

export default CurrentMagazine;

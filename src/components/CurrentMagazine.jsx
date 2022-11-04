import React from 'react';

import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import TitlebarImageList from './TitleBarImageList';
// import assetManager from '../assets/assetManager';
// import { setMagazine } from '../store/magazineSlice';

function CurrentMagazine() {
  const [index, setIndex] = React.useState(0);
  const magazines = useSelector((state) => state.magazine[0]);

  React.useEffect(() => {
    // dispatch(setMagazine(assetManager.images));
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % magazines.images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [magazines]);
  const getImageIndex = (image) => {
    const imageIndex = magazines.images.findIndex((item) => item.id === image.id);
    return imageIndex;
  };

  return (
    <Grid container marginTop={3} sx={{ display: 'flex' }}>
      <Grid item xs={12} md={8}>
        <img src={magazines.images[index].src} style={{ marginTop: 16, width: '100%' }} alt="random" />
      </Grid>
      <Grid item xs={2} md={4}>
        <TitlebarImageList onImageSelect={(image) => setIndex(getImageIndex(image))} />
      </Grid>

    </Grid>
  );
}

export default CurrentMagazine;

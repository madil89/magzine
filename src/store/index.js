import { configureStore } from '@reduxjs/toolkit';
import magazineReducer from './magazineSlice';
import blogSliceReducer from './blogSlice';
import loadingSliceReducer from './loadingSlice';
import gallerySliceReducer from './gallerySlice';

export default configureStore({
  reducer: {
    magazine: magazineReducer,
    blogs: blogSliceReducer,
    loading: loadingSliceReducer,
    gallery: gallerySliceReducer,
  },
});

import { configureStore } from '@reduxjs/toolkit';
import magazineReducer from './magazineSlice';
import blogSliceReducer from './blogSlice';

export default configureStore({
  reducer: {
    magazine: magazineReducer,
    blogs: blogSliceReducer,
  },
});

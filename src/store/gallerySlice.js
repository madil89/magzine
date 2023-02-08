/* eslint-disable import/prefer-default-export */
import { createSlice } from '@reduxjs/toolkit';
import firestore from '../api/firestore';
import { setLoading } from './loadingSlice';

export const gallerySlice = createSlice({
  name: 'gallery',
  initialState: [],
  reducers: {
    setGallery: (state, action) => action.payload,
  },
});

export const { setGallery } = gallerySlice.actions;

export const loadGallery = () => (dispatch) => {
  dispatch(setLoading(true));
  firestore.getAllGalleries().then((result) => {
    dispatch(setGallery(result));
    dispatch(setLoading(false));
  });
};

export const updateGallery = (id, gallery) => (dispatch) => {
  firestore.updateGallery(id, gallery).then(() => dispatch(setGallery(gallery)));
};

export default gallerySlice.reducer;

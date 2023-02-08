/* eslint-disable import/prefer-default-export */
import { createSlice } from '@reduxjs/toolkit';
import firestore from '../api/firestore';
import magazineManager from '../assets/initMagazine';
import { setLoading } from './loadingSlice';

export const magazineSlice = createSlice({
  name: 'magazine',
  initialState: magazineManager.magazines,
  reducers: {
    setMagazine: (state, action) => action.payload,
  },
});

export const { setMagazine } = magazineSlice.actions;

export const loadMagazine = () => (dispatch) => {
  dispatch(setLoading(true));
  firestore.getAllMagazines().then((result) => {
    dispatch(setMagazine(result));
    dispatch(setLoading(false));
  });
};

export const updateMagazine = (id, magazine) => (dispatch) => {
  firestore.updateMagazine(id, magazine).then(() => dispatch(setMagazine(magazine)));
};

export default magazineSlice.reducer;

/* eslint-disable import/prefer-default-export */
import { createSlice } from '@reduxjs/toolkit';
import magazineManager from '../assets/initMagazine';

export const magazineSlice = createSlice({
  name: 'magazine',
  initialState: magazineManager.magazines,
  reducers: {
    setMagazine: (state, action) => action.payload,
  },
});

export const { setMagazine } = magazineSlice.actions;

export default magazineSlice.reducer;

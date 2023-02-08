import { createSlice } from '@reduxjs/toolkit';

export const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    data: [],
  },
  reducers: {
    setLoading: (state, action) => action.payload,
  },
});

export const { setLoading } = loadingSlice.actions;
export default loadingSlice.reducer;

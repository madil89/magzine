import { createSlice } from '@reduxjs/toolkit';

export const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    data: [],
  },
  reducers: {
    setBlog: (state, action) => action.payload,
  },
});

export const { setBlog } = blogSlice.actions;
export default blogSlice.reducer;

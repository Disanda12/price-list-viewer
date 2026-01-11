import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    theme: 'light',
    isIntroShown: false,
    isLoading: false,
  },
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setIntroShown: (state, action) => {
      state.isIntroShown = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setTheme, setIntroShown, setLoading } = uiSlice.actions;
export default uiSlice.reducer;
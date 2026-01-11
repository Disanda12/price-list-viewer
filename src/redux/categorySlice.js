import { createSlice } from '@reduxjs/toolkit';

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [
      { id: 1, name: 'Rice', icon: '🍚', color: '#FFEAA7' },
      { id: 2, name: 'Vegetables', icon: '🥦', color: '#55EFC4' },
      { id: 3, name: 'Fish & Meat', icon: '🍖', color: '#FD79A8' },
      { id: 4, name: 'Beverages', icon: '🥤', color: '#74B9FF' },
      { id: 5, name: 'Services', icon: '🛠️', color: '#A29BFE' },
    ],
    services: [
      { id: 1, name: 'Water Delivery', icon: '💧', color: '#00CEC9' },
      { id: 2, name: 'Gas Refill', icon: '🔥', color: '#E17055' },
      { id: 3, name: 'Lottery', icon: '🎫', color: '#FDCB6E' },
    ],
    selectedCategory: 1,
  },
  reducers: {
    selectCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
});

export const { selectCategory } = categorySlice.actions;
export default categorySlice.reducer;
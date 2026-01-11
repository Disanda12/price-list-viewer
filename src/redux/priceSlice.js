import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPrices } from '../services/api';

export const loadPrices = createAsyncThunk(
  'prices/loadPrices',
  async () => {
    const response = await fetchPrices();
    return response.data;
  }
);

const priceSlice = createSlice({
  name: 'prices',
  initialState: {
    items: [],
    loading: false,
    error: null,
    lastUpdated: null,
  },
  reducers: {
    updatePrice: (state, action) => {
      const { id, price } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        item.price = price;
        item.history.push({ date: new Date().toISOString(), price });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPrices.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadPrices.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(loadPrices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { updatePrice } = priceSlice.actions;
export default priceSlice.reducer;
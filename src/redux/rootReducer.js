import { combineReducers } from '@reduxjs/toolkit';
import priceSlice from './priceSlice';
import categorySlice from './categorySlice';
import uiSlice from './uiSlice';

const rootReducer = combineReducers({
  prices: priceSlice,
  categories: categorySlice,
  ui: uiSlice,
});

export default rootReducer;
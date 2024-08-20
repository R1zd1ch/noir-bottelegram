import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice.js';
import productsReducer from './productsSlice.js';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
  },
});

export default store
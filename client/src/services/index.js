import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartApi.js';

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store
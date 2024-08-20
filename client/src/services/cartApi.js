import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    setCart: (state, action) => {
      state.items = action.payload;
    },
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
  },
});

export const { setCart, addItem } = cartSlice.actions;

export const fetchCart = (telegramId) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/cart/${telegramId}`);
    
    if (response.status !== 200) {
      throw new Error('Сеть не отвечает');
    }

    dispatch(setCart(response.data));
  } catch (error) {
    console.error('Ошибка при получении корзины:', error);
    // Обработка ошибки
  }
};

export const addToCart = (telegramId, product) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/cart`, {
      telegram_id: telegramId,
      product_id: product.id,
      quantity: 1,
    });
    
    if (response.status !== 200) {
      throw new Error('Ошибка при добавлении в корзину');
    }

    dispatch(addItem(product));
  } catch (error) {
    console.error('Ошибка при добавлении в корзину:', error);
    // Обработка ошибки
  }
};

export default cartSlice.reducer;

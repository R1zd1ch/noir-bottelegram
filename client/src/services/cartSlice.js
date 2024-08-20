import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3000';

// Асинхронный thunk для получения товаров в корзине
export const fetchCart = createAsyncThunk('carts/fetchCart', async (telegramId) => {
  const response = await axios.get(`${API_URL}/carts/${telegramId}`);
  if (response.status !== 200) {
    throw new Error('Ошибка при получении корзины');
  }
  return response.data; // Товары в корзине из сервера
});

// Асинхронный thunk для добавления товара в корзину
export const addToCart = createAsyncThunk(
  'carts/addToCart',
  async ({ telegramId, product }, { getState, dispatch }) => {
    // Сначала загружаем корзину
    await dispatch(fetchCart(telegramId));
    
    // Получаем состояние корзины после загрузки
    const state = getState();
    const cartItems = state.cart.items;

    // Проверяем, есть ли уже такой товар в корзине
    const existingItem = cartItems.find(item => item.product_id === product.id);

    if (existingItem) {
      // Если товар уже есть в корзине, увеличиваем его количество
      const response = await axios.post(`${API_URL}/carts`, {
        telegram_id: telegramId,
        product_id: product.id,
        quantity: 1,  // Увеличиваем количество на 1
      });

      if (response.status !== 200) {
        throw new Error('Ошибка при обновлении товара в корзине');
      }

      return {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
    } else {
      // Если товара нет в корзине, добавляем его
      const response = await axios.post(`${API_URL}/carts`, {
        telegram_id: telegramId,
        product_id: product.id,
        quantity: 1,  // Добавляем товар с количеством 1
      });

      if (response.status !== 200) {
        throw new Error('Ошибка при добавлении товара в корзину');
      }

      return { ...product, quantity: 1 };
    }
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],       // Товары в корзине
    status: 'idle',  // Статус загрузки: idle, loading, succeeded, failed
    error: null,     // Сообщения об ошибках
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        const existingItem = state.items.find(item => item.product_id === action.payload.product_id);
        if (existingItem) {
          existingItem.quantity = action.payload.quantity;
        } else {
          state.items.push(action.payload);
        }
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

// Селекторы для получения данных из состояния
export const selectCartItems = (state) => state.cart.items;
export const selectCartStatus = (state) => state.cart.status;
export const selectCartError = (state) => state.cart.error;

export default cartSlice.reducer;

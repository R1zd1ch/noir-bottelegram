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
    console.log(state.cart.items)
    const cartItems = state.cart.items;

    // Проверяем, есть ли уже такой товар в корзине
    const existingItem = cartItems.find(item => item.product_id === product.product_id);

    if (existingItem) {
      // Если товар уже есть в корзине, возвращаем ошибку
      throw new Error('Товар уже добавлен в корзину');
    } else {
      // Если товара нет в корзине, добавляем его
      const response = await axios.post(`${API_URL}/carts`, {
        telegram_id: telegramId,
        product_id: product.product_id,
      });

      if (response.status !== 200) {
        throw new Error('Ошибка при добавлении товара в корзину');
      }

      return product;
    }
  }
);

// Асинхронный thunk для удаления товара из корзины
export const removeFromCart = createAsyncThunk(
  'carts/removeFromCart',
  async ({ telegramId, productId }, { dispatch }) => {
    const response = await axios.delete(`${API_URL}/carts`, {
      data: {
        telegram_id: telegramId,
        product_id: productId,
      },
    });

    if (response.status !== 200) {
      throw new Error('Ошибка при удалении товара из корзины');
    }

    // Обновляем корзину после удаления товара
    await dispatch(fetchCart(telegramId));

    return productId; // Возвращаем ID удаленного товара для обновления состояния
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],       // Товары в корзине
    status: 'idle',  // Статус загрузки: idle, loading, succeeded, failed
    error: null,     // Сообщения об ошибках
    showCart: false,
  },
  reducers: {
    toggleShowCart(state) {
      state.showCart = !state.showCart;
    },
    toggleHideCart(state) {
      state.showCart = false;
    }
  },
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
        state.items.push(action.payload);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.product_id !== action.payload);
        state.status = 'succeeded';
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { toggleHideCart, toggleShowCart } = cartSlice.actions;

// Селекторы для получения данных из состояния
export const selectCartItems = (state) => state.cart.items;
export const selectCartStatus = (state) => state.cart.status;
export const selectCartError = (state) => state.cart.error;
export const selectShowCart = (state) => state.cart.showCart;

export default cartSlice.reducer;

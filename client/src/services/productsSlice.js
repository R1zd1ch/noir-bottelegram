import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3000';

// Асинхронный thunk для получения продуктов
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get(`${API_URL}/products`);
  if (response.status !== 200) {
    throw new Error('Ошибка при получении продуктов');
  }
  console.log(response.data);
  return response.data; // Возвращаем данные из БД для обработки в extraReducers
});

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],    // Хранение продуктов из базы данных
    status: 'idle', // Статус загрузки: idle, loading, succeeded, failed
    error: null,   // Хранение сообщений об ошибках
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Селекторы для получения данных из состояния
export const selectAllProducts = (state) => state.products.items;
export const selectProductsStatus = (state) => state.products.status;
export const selectProductsError = (state) => state.products.error;

export default productsSlice.reducer;

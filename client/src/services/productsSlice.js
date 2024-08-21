import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3000';

// Асинхронный thunk для получения продуктов
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get(`${API_URL}/products`);
  if (response.status !== 200) {
    throw new Error('Ошибка при получении продуктов');
  }
  return response.data; // Возвращаем данные из БД для обработки в extraReducers
});

// Асинхронный thunk для добавления нового продукта
export const addProduct = createAsyncThunk('products/addProduct', async (product) => {
  const response = await axios.post(`${API_URL}/products`, product);
  if (response.status !== 200) {
    throw new Error('Ошибка при добавлении продукта');
  }
  return response.data; // Возвращаем добавленный продукт для обновления состояния
});

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],       // Хранение продуктов из базы данных
    status: 'idle',  // Статус загрузки: idle, loading, succeeded, failed
    error: null,     // Хранение сообщений об ошибках
    showProducts: false,
  },
  reducers: {
    toggleShowProducts(state) {
      state.showProducts = !state.showProducts;
    },
  },
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
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload); // Добавляем новый продукт в список
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

// Селекторы для получения данных из состояния
export const { toggleShowProducts } = productsSlice.actions;

export const selectAllProducts = (state) => state.products.items;
export const selectProductsStatus = (state) => state.products.status;
export const selectProductsError = (state) => state.products.error;
export const selectShowProducts = (state) => state.products.showProducts

export default productsSlice.reducer;

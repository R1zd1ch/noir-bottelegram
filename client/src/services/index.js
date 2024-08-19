import { configureStore } from '@reduxjs/toolkit';
import { cartApi } from './cartApi';

const store = configureStore({
	reducer: {
		[cartApi.reducerPath]: cartApi.reducer,
	},

	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cartApi.middleware),
});

export default store;
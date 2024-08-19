import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cartApi = createApi({
	reducerPath: 'cartApi',
	baseQuery: fetchBaseQuery(),
	endpoints: (builder) => ({
		getCart: builder.query({
			query: () => '/cart',
		}),
		addItem: builder.mutation({
			query: (newItem) => ({
				url: '/cart',
				method: 'POST',
				body: newItem,
			}),
		}),
		removerItem: builder.mutation({
			query: (id) => ({
				url: `/cart/${id}`,
				method: 'DELETE',
			}),
		}),
	}),
});

export const { useGetCartQuery, useAddItemMutation, useRemoveItemMutation } = cartApi;
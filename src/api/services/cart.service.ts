import type { Cart } from '@/types/types.app';
import api from '../../lib/api';
import type { Session } from 'react-router';

export const CART_ENDPOINTS = {
	CARTS: '/carts',
};

export const CartService = {
	getCartByUserId: async (userId: string): Promise<any> => {
		const response = await api.get(`${CART_ENDPOINTS.CARTS}?userId=${userId}`);
		const carts = response.data;

		if (carts.length === 0) {
			const newCartResponse = await api.post(CART_ENDPOINTS.CARTS, {
				userId,
				items: [],
				createdAt: new Date().toISOString(),
			});
			return newCartResponse.data;
		}

		return carts[0];
	},

	createCart: async (userId: string): Promise<Cart> => {
		const response = await api.post(CART_ENDPOINTS.CARTS, {
			userId,
			items: [],
			createdAt: new Date().toISOString(),
		});
		return response.data;
	},

	addItem: async (userId: string, item: Pick<Session, 'id'>): Promise<Cart> => {
		let cart = await CartService.getCartByUserId(userId);
		if (!cart) {
			cart = await CartService.createCart(userId);
		}
		const ItemId = item.id;
		cart.items.find((item: string) => item === ItemId)
			? cart
			: (cart.items = [...cart.items, ItemId]);
		await CartService.updateCart(cart.id, cart);
		return cart;
	},

	updateCart: async (cartId: string, cartData: any): Promise<any> => {
		const response = await api.put(
			`${CART_ENDPOINTS.CARTS}/${cartId}`,
			cartData,
		);
		return response.data;
	},
};

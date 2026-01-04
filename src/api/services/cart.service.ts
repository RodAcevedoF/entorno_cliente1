import type { Cart, CartItem } from '@/types/types.app';
import api from '../../lib/api';

// Pure helpers to manipulate CartItem arrays (kept in service for single source of truth)
export const ensureItems = (items: any): CartItem[] =>
	Array.isArray(items) ? items : [];

export const mergeItems = (
	items: CartItem[] = [],
	item: CartItem,
): CartItem[] => {
	const existing = items.find((ci) => ci.sessionId === item.sessionId);
	if (existing) {
		return items.map((ci) =>
			ci.sessionId === item.sessionId
				? { ...ci, quantity: (ci.quantity ?? 0) + item.quantity }
				: ci,
		);
	}
	return [...items, item];
};

export const removeItemFromItems = (
	items: CartItem[] = [],
	sessionId: string,
): CartItem[] => items.filter((ci) => ci.sessionId !== sessionId);

export const CART_ENDPOINTS = {
	CARTS: '/carts',
	ORDERS: '/orders',
};

export const CartService = {
	getCartByUserId: async (userId: string): Promise<Cart> => {
		const response = await api.get(CART_ENDPOINTS.CARTS, {
			params: { userId, _limit: 1 },
		});
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

	addItem: async ({
		userId,
		item,
	}: {
		userId: string;
		item: CartItem;
	}): Promise<Cart> => {
		let cart = await CartService.getCartByUserId(userId);
		if (!cart) {
			cart = await CartService.createCart(userId);
		}

		cart.items = ensureItems(cart.items);
		cart.items = mergeItems(cart.items, item);

		const updated = await CartService.updateCart(cart.id, cart);
		return updated;
	},

	removeItem: async ({
		userId,
		sessionId,
	}: {
		userId: string;
		sessionId: string;
	}): Promise<Cart> => {
		const cart = await CartService.getCartByUserId(userId);
		if (!cart) throw new Error('Cart not found');

		const newItems = removeItemFromItems(ensureItems(cart.items), sessionId);
		const updated = await CartService.updateCart(cart.id, {
			...cart,
			items: newItems,
		});
		return updated;
	},

	clearCart: async ({ userId }: { userId: string }): Promise<Cart> => {
		const cart = await CartService.getCartByUserId(userId);
		if (!cart) throw new Error('Cart not found');

		const updated = await CartService.updateCart(cart.id, {
			...cart,
			items: [],
		});
		return updated;
	},

	updateCart: async (cartId: string, cartData: Partial<Cart>): Promise<Cart> => {
		const response = await api.put(
			`${CART_ENDPOINTS.CARTS}/${cartId}`,
			cartData,
		);
		return response.data;
	},
};

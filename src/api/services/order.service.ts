import type { CartItem, Order } from '@/types/types.app';
import api from '../../lib/api';
import { v4 as uuidv4 } from 'uuid';

export const ORDER_ENDPOINTS = {
	ORDERS: '/orders',
};

export const OrderService = {
	getOrdersByUserId: async (userId: string): Promise<Order[]> => {
		const response = await api.get(
			`${ORDER_ENDPOINTS.ORDERS}?userId=${userId}`,
		);
		const orders = response.data;
		return orders;
	},

	createOrder: async (orderData: {
		userId: string;
		items: CartItem[];
		total: number;
	}): Promise<Order> => {
		const response = await api.post(ORDER_ENDPOINTS.ORDERS, {
			id: uuidv4(),
			...orderData,
			orderDate: new Date().toISOString(),
		});
		return response.data;
	},

	removeOrder: async (orderId: string): Promise<void> => {
		await api.delete(`${ORDER_ENDPOINTS.ORDERS}/${orderId}`);
	},
};

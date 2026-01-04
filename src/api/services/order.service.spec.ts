import { describe, it, expect, vi, mock } from 'bun:test';
import { OrderService, ORDER_ENDPOINTS } from './order.service';
import api from '../../lib/api';

mock.module('../../lib/api', () => ({
	default: {
		get: vi.fn(),
		post: vi.fn(),
		delete: vi.fn(),
	},
}));

describe('OrderService', () => {
	it('getOrdersByUserId fetches user orders', async () => {
		const userId = 'user-123';
		const mockOrders = [{ id: 'order-1', userId }];
		(api.get as any).mockResolvedValue({ data: mockOrders });

		const result = await OrderService.getOrdersByUserId(userId);

		expect(api.get).toHaveBeenCalledWith(
			`${ORDER_ENDPOINTS.ORDERS}?userId=${userId}`,
		);
		expect(result).toEqual(mockOrders);
	});

	it('createOrder creates a new order successfully', async () => {
		const orderData = {
			userId: 'user-123',
			items: [{ sessionId: '1', quantity: 1, name: 'A', price: 10 }],
			total: 10,
		};
		const mockResponse = {
			id: 'new-id',
			...orderData,
			orderDate: '2026-01-04',
		};
		(api.post as any).mockResolvedValue({ data: mockResponse });

		const result = await OrderService.createOrder(orderData);

		expect(api.post).toHaveBeenCalled();
		expect(result).toEqual(mockResponse);
	});

	it('removeOrder deletes an order successfully', async () => {
		const orderId = 'order-123';
		(api.delete as any).mockResolvedValue({ data: {} });

		await OrderService.removeOrder(orderId);

		expect(api.delete).toHaveBeenCalledWith(
			`${ORDER_ENDPOINTS.ORDERS}/${orderId}`,
		);
	});
});

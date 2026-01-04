import { describe, it, expect } from 'vitest';
import { mergeItems, removeItemFromItems } from './cart.service';
import type { CartItem } from '@/types/types.app';

describe('CartService helpers', () => {
	it('mergeItems adds a new item when sessionId does not exist', () => {
		const existing: CartItem[] = [
			{ sessionId: '1', quantity: 1, name: 'A', price: 10 },
		];
		const item: CartItem = {
			sessionId: '2',
			quantity: 2,
			name: 'B',
			price: 20,
		};
		const result = mergeItems(existing, item);
		expect(result).toHaveLength(2);
		expect(result.find((i) => i.sessionId === '2')?.quantity).toBe(2);
	});

	it('mergeItems increases quantity when sessionId exists', () => {
		const existing: CartItem[] = [
			{ sessionId: '1', quantity: 1, name: 'A', price: 10 },
		];
		const item: CartItem = {
			sessionId: '1',
			quantity: 3,
			name: 'A',
			price: 10,
		};
		const result = mergeItems(existing, item);
		expect(result).toHaveLength(1);
		expect(result[0].quantity).toBe(4);
	});

	it('removeItemFromItems removes the item by sessionId', () => {
		const items: CartItem[] = [
			{ sessionId: '1', quantity: 1, name: 'A', price: 10 },
			{ sessionId: '2', quantity: 2, name: 'B', price: 20 },
		];
		const result = removeItemFromItems(items, '1');
		expect(result).toHaveLength(1);
		expect(result[0].sessionId).toBe('2');
	});
});

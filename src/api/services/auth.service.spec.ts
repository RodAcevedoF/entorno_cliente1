import { describe, it, expect, vi, beforeEach, mock } from 'bun:test';
import { AuthService, AUTH_ENDPOINTS } from './auth.service';
import api from '../../lib/api';
import { comparePassword, hashPassword } from '../../lib/utils/encryption';
import { validatePassword } from '../../lib/utils/validatePassword';

// Mock localStorage
const localStorageMock = (() => {
	let store: Record<string, string> = {};
	return {
		getItem: (key: string) => store[key] || null,
		setItem: (key: string, value: string) => {
			store[key] = value.toString();
		},
		removeItem: (key: string) => {
			delete store[key];
		},
		clear: () => {
			store = {};
		},
	};
})();

Object.defineProperty(global, 'localStorage', {
	value: localStorageMock,
});

mock.module('../../lib/api', () => ({
	default: {
		get: vi.fn(),
		post: vi.fn(),
		delete: vi.fn(),
		patch: vi.fn(),
	},
}));

mock.module('../../lib/utils/encryption', () => ({
	comparePassword: vi.fn(),
	hashPassword: vi.fn(),
}));

mock.module('../../lib/utils/validatePassword', () => ({
	validatePassword: vi.fn(),
}));

describe('AuthService', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		localStorage.clear();
	});

	it('getUserById returns user data successfully', async () => {
		const mockUser = { id: '1', email: 'test@test.com' };
		(api.get as any).mockResolvedValue({ data: mockUser });

		const result = await AuthService.getUserById('1');

		expect(api.get).toHaveBeenCalledWith(`${AUTH_ENDPOINTS.USERS}/1`);
		expect(result).toEqual(mockUser);
	});

	it('login throws error with invalid credentials', async () => {
		(api.get as any).mockResolvedValue({ data: [] }); // User not found

		await expect(
			AuthService.login({ email: 'x@x.com', password: 'p' }),
		).rejects.toThrow('Invalid credentials');
	});

	it('login succeeds with correct credentials', async () => {
		const mockUser = { id: '1', email: 'test@test.com', password: 'hashed' };
		(api.get as any).mockResolvedValueOnce({ data: [mockUser] }); // getUserByEmail
		(api.get as any).mockResolvedValueOnce({ data: [] }); // startUserSession
		(api.post as any).mockResolvedValue({ data: { id: 'sess-1' } }); // startUserSession
		(comparePassword as any).mockResolvedValue(true);

		const result = await AuthService.login({
			email: 'test@test.com',
			password: 'password',
		});

		expect(result).toEqual(mockUser);
		expect(localStorage.getItem('valenti_user')).toBe('1');
	});

	it('updateUser calls patch with correct data', async () => {
		const userId = '1';
		const updateData = { themePreference: 'dark' as const };
		(api.patch as any).mockResolvedValue({
			data: { id: userId, ...updateData },
		});

		const result = await AuthService.updateUser(userId, updateData);

		expect(api.patch).toHaveBeenCalledWith(
			`${AUTH_ENDPOINTS.USERS}/${userId}`,
			updateData,
		);
		expect(result.themePreference).toBe('dark');
	});
});

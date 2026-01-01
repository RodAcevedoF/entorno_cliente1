import { ValidationError } from '@/common/errors/errors.app';
import api from '@/lib/api';
import { comparePassword, hashPassword } from '@/lib/utils/encryption';
import {
	validatePassword,
	type PasswordValidationResult,
} from '@/lib/utils/validatePassword';
import type { User, UserDTO } from '@/types/types.app';
import { v4 as uuidv4 } from 'uuid';

export const AUTH_ENDPOINTS = {
	USERS: '/users',
};

const USER_STORAGE_KEY = 'valenti_user';

export const AuthService = {
	getUserFromApi: async (id: string): Promise<any> => {
		const response = await api.get(`${AUTH_ENDPOINTS.USERS}/${id}`);
		return response.data;
	},

	getUserByEmail: async (email: string): Promise<User | undefined> => {
		const response = await api.get(AUTH_ENDPOINTS.USERS, { params: { email } });
		return response.data[0];
	},
	saveUserToStorage: (user: any) => {
		localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
	},

	removeUserFromStorage: () => {
		localStorage.removeItem(USER_STORAGE_KEY);
	},

	login: async (u: UserDTO): Promise<User> => {
		if (!u.email || !u.password) {
			throw new Error('Email and password are required');
		}
		const user = await AuthService.getUserByEmail(u.email);
		if (!user) {
			throw new Error('Invalid credentials');
		}
		const isMatch = await comparePassword(u.password, user.password);
		if (!isMatch) {
			throw new Error('Invalid credentials');
		}

		AuthService.saveUserToStorage(user);
		return user;
	},

	register: async (userData: UserDTO): Promise<User> => {
		try {
			const check = await api.get(
				`${AUTH_ENDPOINTS.USERS}?email=${userData.email}`,
			);
			if (check.data.length > 0) {
				throw new ValidationError('Email already exists');
			}
			const validatedPassword: PasswordValidationResult =
				validatePassword(userData);
			if (!validatedPassword.valid)
				throw new ValidationError(validatedPassword.messages);

			const response = await api.post(AUTH_ENDPOINTS.USERS, {
				id: uuidv4(),
				username: userData?.username,
				password: await hashPassword(userData?.password),
				role: 'user',
				createdAt: new Date().toISOString(),
				email: userData?.email,
				themePreference: 'light',
			});

			const user = response.data;
			return user;
		} catch (error) {
			throw error;
		}
	},

	logout: async (): Promise<void> => {
		AuthService.removeUserFromStorage();
		return Promise.resolve();
	},
};

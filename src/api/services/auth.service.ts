import { ValidationError } from '@/common/errors/errors.app';
import api from '@/lib/api';
import { comparePassword, hashPassword } from '@/lib/utils/encryption';
import {
	validatePassword,
	type PasswordValidationResult,
} from '@/lib/utils/validatePassword';
import type { User, UserDTO, UserSession } from '@/types/types.app';
import { v4 as uuidv4 } from 'uuid';

export const AUTH_ENDPOINTS = {
	USERS: '/users',
	SESSIONS: '/user-sessions',
};

const USER_STORAGE_KEY = 'valenti_user';

export const AuthService = {
	getUserById: async (id: string): Promise<User | undefined> => {
		try {
			const response = await api.get(`${AUTH_ENDPOINTS.USERS}/${id}`);
			return response.data;
		} catch (err: any) {
			if (err.response?.status === 404) return undefined;
			throw err;
		}
	},

	getUserSession: async (userId: string): Promise<UserSession> => {
		const response = await api.get(AUTH_ENDPOINTS.SESSIONS, {
			params: { userId },
		});
		if (response.data.length === 0) {
			throw new Error('No active session found for user');
		}
		return response.data[0];
	},

	getUserByEmail: async (email: string): Promise<User | undefined> => {
		const response = await api.get(AUTH_ENDPOINTS.USERS, { params: { email } });
		return response.data[0];
	},
	saveUserIdToStorage: (id: string | null | undefined) => {
		if (id) {
			localStorage.setItem(USER_STORAGE_KEY, String(id));
		} else {
			localStorage.removeItem(USER_STORAGE_KEY);
		}
	},

	saveUserToStorage: (user: Partial<User>) => {
		return AuthService.saveUserIdToStorage(user.id);
	},

	startUserSession: async (user: Partial<User>) => {
		const existingSessionResponse = await api.get(AUTH_ENDPOINTS.SESSIONS, {
			params: { userId: user.id },
		});

		const sessions = Array.isArray(existingSessionResponse.data)
			? existingSessionResponse.data
			: [];

		for (const session of sessions) {
			const isValid = AuthService.checkSessionTime(new Date(session.startedAt));
			if (isValid) {
				return session;
			}
			await api.delete(`${AUTH_ENDPOINTS.SESSIONS}/${session.id}`);
		}

		const res = await api.post(AUTH_ENDPOINTS.SESSIONS, {
			userId: user.id,
			startedAt: new Date().toISOString(),
		});
		return res.data;
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

		AuthService.saveUserIdToStorage(user.id);

		AuthService.startUserSession(user).then((session) => {
			console.log('User session started:', session);
		});

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

	logout: async (userId: string): Promise<void> => {
		if (!userId) return;
		try {
			await AuthService.getUserSession(userId);
		} catch (err) {
			console.warn('No active session to logout from');
		}
		localStorage.removeItem(USER_STORAGE_KEY);
		await api.delete(AUTH_ENDPOINTS.SESSIONS, { params: { userId } });
	},

	updateUser: async (
		userId: string,
		data: Partial<User>,
	): Promise<User> => {
		const response = await api.patch(`${AUTH_ENDPOINTS.USERS}/${userId}`, data);
		return response.data;
	},

	checkSessionTime: (start: Date): boolean => {
		const startTime = new Date(start).getTime();
		const now = Date.now();
		const diffInMinutes = (now - startTime) / (1000 * 60);
		return diffInMinutes < 1440 * 7;
	},
};

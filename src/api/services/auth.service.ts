import api from '@/api/lib/api';

// We use the standard 'users' resource from json-server
export const AUTH_ENDPOINTS = {
	USERS: '/users',
};

export const AuthService = {
	// Check if a user exists with these credentials
	login: async (username: string, password: string): Promise<any> => {
		// json-server allows filtering: /users?username=x&password=y
		const response = await api.get(
			`${AUTH_ENDPOINTS.USERS}?username=${username}&password=${password}`,
		);
		const users = response.data;

		if (users.length === 0) {
			throw new Error('Invalid credentials');
		}
		return users[0];
	},

	// Save a new user to data.json
	register: async (username: string, password: string): Promise<any> => {
		// First check if user already exists
		const check = await api.get(`${AUTH_ENDPOINTS.USERS}?username=${username}`);
		if (check.data.length > 0) {
			throw new Error('Username already exists');
		}

		// Create new user
		const response = await api.post(AUTH_ENDPOINTS.USERS, {
			username,
			password,
			role: 'user', // Default role
			createdAt: new Date().toISOString(),
		});
		return response.data;
	},

	logout: async (): Promise<void> => {
		// No server-side logout needed for json-server (stateless)
		return Promise.resolve();
	},
};

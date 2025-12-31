import axios from 'axios';

// Create a configured axios instance
const api = axios.create({
	baseURL: '/api',
	headers: {
		'Content-Type': 'application/json',
	},
	timeout: 10000,
});

// Optional: Add interceptors for request/response logging or error handling here
api.interceptors.response.use(
	(response) => response,
	(error) => {
		// Common error handling (e.g., logging out on 401) can go here
		return Promise.reject(error);
	},
);

export default api;

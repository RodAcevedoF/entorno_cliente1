import axios from 'axios';

const api = axios.create({
	baseURL: '/api',
	headers: {
		'Content-Type': 'application/json',
	},
	timeout: 10000,
});

api.interceptors.response.use(
	(response) => response,
	(error) => {
		return Promise.reject(error);
	},
);

export default api;

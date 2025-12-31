import { type PluginOption } from 'vite';

export const authMockPlugin = (): PluginOption => ({
	name: 'auth-mock-server',
	configureServer(server) {
		server.middlewares.use('/api/auth', (req, res, next) => {
			if (req.method === 'GET' && req.url === '/status') {
				const cookie = req.headers.cookie || '';
				const isAuthenticated = cookie.includes('auth_token=mock-token');
				res.setHeader('Content-Type', 'application/json');
				res.end(
					JSON.stringify({
						isAuthenticated,
						userRole: isAuthenticated ? 'user' : 'guest',
					}),
				);
				return;
			}
			if (req.method === 'POST' && req.url === '/login') {
				// In a real app, we'd parse the body here.
				// For now, we assume success.
				res.setHeader('Set-Cookie', 'auth_token=mock-token; Path=/; HttpOnly');
				res.setHeader('Content-Type', 'application/json');
				res.end(JSON.stringify({ success: true }));
				return;
			}
			if (req.method === 'POST' && req.url === '/logout') {
				res.setHeader(
					'Set-Cookie',
					'auth_token=; Path=/; HttpOnly; Max-Age=0',
				);
				res.setHeader('Content-Type', 'application/json');
				res.end(JSON.stringify({ success: true }));
				return;
			}
			if (req.method === 'POST' && req.url === '/register') {
				res.setHeader('Content-Type', 'application/json');
				res.end(JSON.stringify({ success: true }));
				return;
			}
			next();
		});
	},
});

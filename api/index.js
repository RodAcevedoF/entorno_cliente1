import jsonServer from 'json-server';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const data = require('./data.json');

const server = jsonServer.create();
const router = jsonServer.router(data);
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Rewrite to strip /api prefix from incoming requests
server.use(jsonServer.rewriter({
    '/api/*': '/$1'
}));

server.use(router);

export default server;

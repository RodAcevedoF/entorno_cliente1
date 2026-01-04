import jsonServer from 'json-server';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const db = require('./data.json');
const server = jsonServer.create();
const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.rewriter({
    '/api/*': '/$1'
}));
server.use(router);

export default server;

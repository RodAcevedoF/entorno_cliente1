import jsonServer from 'json-server';
import path from 'path';
import fs from 'fs';

const server = jsonServer.create();
const filePath = path.join(process.cwd(), 'data', 'data.json');
const data = fs.readFileSync(filePath, "utf-8");
const db = JSON.parse(data);
const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.rewriter({
    '/api/*': '/$1'
}));
server.use(router);

export default server;

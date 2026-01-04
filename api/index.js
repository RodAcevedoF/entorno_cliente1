import { createApp } from 'json-server/lib/app.js';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const data = require('./data.json');

// Mock LowDB adapter for read-only/in-memory usage
const db = {
    data: data,
    write: async () => { } // No-op for read-only or in-memory updates
};

const app = createApp(db);

export default (req, res) => {
    // Strip /api prefix
    req.url = req.url.replace(/^\/api/, '');
    if (req.url === '') req.url = '/';
    
    return app.handler(req, res);
};
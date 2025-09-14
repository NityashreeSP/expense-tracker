import express from 'express';
import cors from 'cors';
import { db } from './db/db.js';
import { readdirSync } from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Use PORT from Render or fallback
// Render typically gives you $PORT automatically
const PORT = process.env.PORT || 5000;

app.use(express.json());

// CORS setup
// Optionally restrict origin in production
app.use(cors({
  origin: process.env.FRONTEND_URL || '*'  // set FRONTEND_URL in environment vars
}));

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  // Path to your frontend build output
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  // For SPA routing: serve index.html for all routes not handled by API
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
  });
}

// Dynamic load routes
const routesDir = path.join(__dirname, './routes');
const routeFiles = readdirSync(routesDir).filter(file => file.endsWith('.js'));

for (const file of routeFiles) {
  const absoluteFilePath = path.join(routesDir, file);
  const fileUrl = pathToFileURL(absoluteFilePath).href;
  const routeModule = await import(fileUrl);

  if (routeModule.default) {
    // assuming route modules export default a router
    app.use('/api/v1', routeModule.default);
  } else {
    console.warn(`Route file ${file} has no default export`);
  }
}

const server = async () => {
  await db();  // ensure connection established
  app.listen(PORT, () => {
    console.log(`Backend listening on port ${PORT}`);
  });
};

server();

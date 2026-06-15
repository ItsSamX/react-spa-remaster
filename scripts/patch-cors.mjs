/**
 * Patches @expo/cli's CorsMiddleware to allow requests from vusercontent.net
 * (the v0 preview iframe origin). Runs automatically via postinstall.
 */
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const target = join(__dirname, '../node_modules/@expo/cli/build/src/start/server/middleware/CorsMiddleware.js');

let src;
try {
  src = readFileSync(target, 'utf8');
} catch {
  console.log('[patch-cors] CorsMiddleware.js not found, skipping.');
  process.exit(0);
}

// Idempotent: skip if already patched
if (src.includes('vusercontent.net')) {
  console.log('[patch-cors] Already patched, skipping.');
  process.exit(0);
}

// 1. Add vusercontent.net to allowed hostnames
src = src.replace(
  `const DEFAULT_ALLOWED_CORS_HOSTNAMES = [
    "localhost",
    "chrome-devtools-frontend.appspot.com",
    "devtools"
];`,
  `const DEFAULT_ALLOWED_CORS_HOSTNAMES = [
    "localhost",
    "chrome-devtools-frontend.appspot.com",
    "devtools",
    "vusercontent.net"
];`
);

// 2. Change exact .includes() to endsWith-aware check
src = src.replace(
  `if (!isSameOrigin && !allowedHostnames.includes(hostname)) {`,
  `if (!isSameOrigin && !allowedHostnames.some((h)=>hostname === h || hostname.endsWith(\`.\${h}\`))) {`
);

writeFileSync(target, src, 'utf8');
console.log('[patch-cors] CorsMiddleware patched successfully.');

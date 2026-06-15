const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);
config.resolver.sourceExts.push('cjs');

/**
 * Inject a permissive CORS middleware that runs before Expo's CorsMiddleware.
 * This allows the v0 preview iframe (*.vusercontent.net) to load the bundle.
 */
config.server = config.server || {};
const originalEnhance = config.server.enhanceMiddleware;
config.server.enhanceMiddleware = (metroMiddleware, server) => {
  const base = originalEnhance
    ? originalEnhance(metroMiddleware, server)
    : metroMiddleware;

  return (req, res, next) => {
    const origin = req.headers.origin;
    if (origin) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
      res.setHeader('Access-Control-Allow-Credentials', 'true');
    }
    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }
    base(req, res, next);
  };
};

module.exports = config;

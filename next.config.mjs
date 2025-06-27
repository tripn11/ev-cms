// next.config.js
import path from 'path';
import { fileURLToPath } from 'url'; // <-- NEW: Import fileURLToPath from 'url'

// NEW: Define __filename and __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here, e.g.:
  // experimental: {
  //   appDir: true,
  // },
  // output: 'standalone', // Consider this for deployment if not already set

  webpack: (config, options) => {
    // Explicitly define the @payload-config alias using the defined __dirname
    config.resolve.alias['@payload-config'] = path.resolve(__dirname, './src/payload.config.ts');

    // Always return the modified config object
    return config;
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
import path from 'path';
import { fileURLToPath } from 'url'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias['@payload-config'] = path.resolve(__dirname, './src/payload.config.ts');
    return config;
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
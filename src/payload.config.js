import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { payloadCloudPlugin } from '@payloadcms/payload-cloud';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { buildConfig } from 'payload';
import { cloudStoragePlugin } from '@payloadcms/plugin-cloud-storage';
import sharp from 'sharp';

import Users from './collections/Users.js';
import Media from './collections/Media.js';
import VehicleTypes from './collections/VehicleTypes.js';
import Brands from './collections/Brands.js';
import Vehicles from './collections/Vehicles.js';
import cloudinaryAdapter from './plugins/cloudinaryAdapter.js';

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
  admin: {
    user: Users.slug,
    meta: { titleSuffix: ' | Enerplaz EVs' },
  },
  collections: [Users, Media, VehicleTypes, Brands, Vehicles],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: { outputFile: 'src/payload-types.js' },
  db: mongooseAdapter({ url: process.env.DATABASE_URI || '' }),
  sharp,
  plugins: [
    payloadCloudPlugin({ storage: false }),
    cloudStoragePlugin({
      collections: {
        media: {
          adapter: cloudinaryAdapter,
          prefix: 'payload-uploads', 
          disableLocalStorage: true,
        },
      },
    }),
  ],
  cors: ['http://localhost:5173', 'https://enerplazevs.com'],
});
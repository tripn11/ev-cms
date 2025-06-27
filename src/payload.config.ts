import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import Users from './collections/Users.js'
import Media from './collections/Media.js'
import VehicleTypes from './collections/VehicleTypes.js'
import Brands from './collections/Brands.js'
import Vehicles from './collections/Vehicles.js'


export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: ' | Enerplaz EVs',
    },
  },

  collections: [Users, Media, VehicleTypes, Brands, Vehicles,],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: 'src/payload-types.ts',
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
  ],
  cors: [
    'https://enerplazevs.com/'
  ],
})
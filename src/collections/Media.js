import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export default {
  
  slug: 'media',
  upload: {
    mimeTypes: ['image/*', 'video/*', 'application/pdf'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'cloudinary_public_id',
      type: 'text',
      required: false,
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
    {
      name: 'url',
      type: 'text',
      admin: { readOnly: true },
    },
    {
      name: 'thumbnailURL',
      type: 'text',
      admin: { readOnly: true },
    },
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
}


import { v2 as cloudinary } from 'cloudinary';
import cloudinaryAdapter from '../plugins/cloudinaryAdapter.js'; // adjust path

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
    adapter: cloudinaryAdapter({ prefix: 'payload-uploads' }), // ✅ KEY LINE
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'cloudinary_public_id',
      type: 'text',
      admin: { readOnly: true, position: 'sidebar' },
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
  hooks: {
    afterRead: [
      async ({ doc }) => {
        const publicId = doc.cloudinary_public_id || doc.filename;
        if (!publicId) return doc;

        const isVideo = doc.mimeType?.startsWith('video');
        const resourceType = isVideo ? 'video' : 'image';

        doc.url = cloudinary.url(publicId, {
          resource_type: resourceType,
          secure: true,
        });

        if (!isVideo) {
          doc.thumbnailURL = cloudinary.url(publicId, {
            resource_type: 'image',
            width: 200,
            height: 200,
            crop: 'fill',
            gravity: 'auto',
            quality: 'auto',
            fetch_format: 'auto',
            secure: true,
          });
        }

        return doc;
      },
    ],
  },
};

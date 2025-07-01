import cloudinaryAdapter from '../plugins/cloudinaryAdapter';
import { v2 as cloudinary } from 'cloudinary';

export default {
  slug: 'media',
  upload: {
    mimeTypes: ['image/*', 'video/*'],
    adapter: cloudinaryAdapter({ prefix: 'payload-uploads' }),
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'cloudinary_public_id',
      type: 'text',
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
  hooks: {
    afterRead: [
      async ({ doc }) => {
        const publicId = doc.cloudinary_public_id || `${doc.prefix}/${doc.filename}`;
        const isVideo = doc.mimeType?.startsWith('video');

        doc.url = cloudinary.url(publicId, {
          resource_type: isVideo ? 'video' : 'image',
          secure: true,
        });

        if (!isVideo) {
          doc.thumbnailURL = cloudinary.url(publicId, {
            resource_type: 'image',
            width: 400,
            height: 400,
            crop: 'fill',
            gravity: 'auto',
            fetch_format: 'auto',
            quality: '100',
            secure: true,
          });
        }
        return doc;
      },
    ],
  },
};

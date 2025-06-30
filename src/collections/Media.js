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

  // ✅ Save public_id before document is written
  hooks: {
    beforeChange: [
      async ({ data, req, operation }) => {
        if (operation === 'create' && req.payload.tempCloudinaryPublicId) {
          req.payload.logger.info(`[BeforeChange] Saving cloudinary_public_id: ${req.payload.tempCloudinaryPublicId}`);
          data.cloudinary_public_id = req.payload.tempCloudinaryPublicId;
          delete req.payload.tempCloudinaryPublicId;
        }
        return data;
      },
    ],

    afterRead: [
      async ({ doc, req }) => {
        const publicIdToUse = doc.cloudinary_public_id || doc.filename;

        req.payload.logger.info(`[Media AfterRead] Public ID for URL generation: ${publicIdToUse}, MIME Type: ${doc.mimeType}`);

        if (!publicIdToUse) {
          req.payload.logger.warn(`[Media AfterRead] Missing public_id or filename for doc ID: ${doc.id}`);
          doc.url = null;
          doc.thumbnailURL = null;
          return doc;
        }

        const isVideo = doc.mimeType?.startsWith('video');
        const resourceType = isVideo ? 'video' : 'image';

        try {
          doc.url = cloudinary.url(publicIdToUse, {
            resource_type: resourceType,
            secure: true,
          });

          if (resourceType === 'image') {
            doc.thumbnailURL = cloudinary.url(publicIdToUse, {
              resource_type: 'image',
              secure: true,
              width: 200,
              height: 200,
              crop: 'fill',
              gravity: 'auto',
              quality: 'auto',
              fetch_format: 'auto',
            });
          } else {
            doc.thumbnailURL = cloudinary.url(publicIdToUse, {
              resource_type: 'video',
              secure: true,
              format: 'jpg',
              width: 200,
              height: 200,
              crop: 'fill',
            });
          }
        } catch (e) {
          req.payload.logger.error(`[Media AfterRead] Error generating Cloudinary URL for ${publicIdToUse}: ${e.message}`);
          doc.url = null;
          doc.thumbnailURL = null;
        }

        return doc;
      },
    ],
  },
};

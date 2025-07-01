import { v2 as cloudinary } from 'cloudinary';
import path from 'path';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const cloudinaryAdapter = (args) => {
  const { prefix } = args;

  return {
    name: 'cloudinary-adapter',

    handleUpload: async ({ file, collection, req }) => {
      const resourceType = file.mimeType.startsWith('video') ? 'video' : 'image';
      const folderName = prefix || collection.slug;

      req.payload.logger.info(`[Cloudinary Adapter] Uploading file: "${file.filename}" to folder: "${folderName}"`);

      const basePublicId = path.parse(file.filename).name;

      const uploadResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: folderName,
            public_id: basePublicId,
            resource_type: resourceType,
            overwrite: true,
            unique_filename: false,
          },
          (error, result) => {
            if (error) {
              req.payload.logger.error(`[Cloudinary Upload Error] for ${file.filename}:`, error.message, error.http_code, error.data);
              return reject(error);
            }
            if (!result) {
              req.payload.logger.error(`[Cloudinary Upload Result] Undefined for ${file.filename}`);
              return reject(new Error('Cloudinary upload result was undefined'));
            }
            req.payload.logger.info(`[Cloudinary Upload Success] Raw uploadResult for "${file.filename}": ${JSON.stringify(result, null, 2)}`);
            resolve(result);
          }
        );
        uploadStream.on('error', (streamError) => {
          req.payload.logger.error(`[Cloudinary Upload Stream Error] for ${file.filename}:`, streamError);
          reject(streamError);
        });
        uploadStream.end(file.buffer);
      });

      const cloudinaryPublicId = uploadResult.public_id;

      req.payload.logger.info(`[Adapter] Setting cloudinary_public_id: ${cloudinaryPublicId}`);

      file.filename = path.parse(file.filename).base;
      file.mimeType = uploadResult.format ? `${resourceType}/${uploadResult.format}` : file.mimeType;
      file.filesize = uploadResult.bytes;
      file.width = uploadResult.width;
      file.height = uploadResult.height;

      return {
        ...file,
        cloudinary_public_id: cloudinaryPublicId,
      };
    },

    handleDelete: async ({ filename, collection, req, doc }) => {
      const publicIdToDelete = doc?.cloudinary_public_id || filename;
      if (!publicIdToDelete) return;

      try {
        const fileExtension = path.extname(publicIdToDelete).toLowerCase();
        const isVideo = ['.mp4', '.webm', '.mov', '.avi', '.ogg', '.ogv', '.wmv', '.flv', '.mkv'].includes(fileExtension) || publicIdToDelete.includes('/video/');
        const resourceType = isVideo ? 'video' : 'image';
        await cloudinary.uploader.destroy(publicIdToDelete, { resource_type: resourceType });
        req.payload.logger.info(`[Cloudinary Delete Success] for ${publicIdToDelete}`);
      } catch (error) {
        req.payload.logger.error(`[Cloudinary Delete Error] for ${publicIdToDelete}: ${error.message}`);
      }
    },

    generateFileURL: ({ filename, collection, doc }) => {
      const publicIdForUrl = doc?.cloudinary_public_id || filename;
      if (!publicIdForUrl) return null;

      const fileExtension = path.extname(publicIdForUrl).toLowerCase();
      const isVideo = ['.mp4', '.webm', '.mov', '.avi'].includes(fileExtension) || publicIdForUrl.includes('/video/');
      const resourceType = isVideo ? 'video' : 'image';

      return cloudinary.url(publicIdForUrl, { resource_type: resourceType, secure: true });
    },

    staticHandler: (req, res, next) => {
      req.payload.logger.warn(`[Cloudinary Static Handler] called for Cloudinary-managed media (${req.url}). Returning 404.`);
      res.status(404).send('Not Found: Media served by external storage.');
    },
  };
};

export default cloudinaryAdapter;

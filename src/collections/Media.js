export default {
  slug: 'media',
  access: {
    read: ()=> true,  
  },
  upload: {
    staticDir: 'media',
    staticURL: '/media',
    fileSizeLimit: 500 * 1024, // Prevent giant uploads
    mimeTypes: ['image/*'],
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
        height: 200,
        crop: true, // keeps aspect clean
      },
      {
        name: 'medium',
        width: 800, // decent size for detail pages
      },
    ],
    adminThumbnail: 'thumbnail',
  },
  admin: {
    useAsTitle: 'filename',
  },
  fields: [
    {
      name: 'altText',
      type: 'text',
      label: 'Alt Text',
      required: true,
    },
  ],
};
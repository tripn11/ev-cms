export default {
  slug: 'vehicle-types',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      hooks: {
        beforeChange: [
          ({ value }) => value?.toLowerCase(),
        ],
      },
    },
  ],
};

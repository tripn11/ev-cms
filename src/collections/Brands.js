export default {
  slug: 'brands',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'vehicleType',
      type: 'relationship',
      relationTo: 'vehicle-types',
      required: true,
    },
  ],
};

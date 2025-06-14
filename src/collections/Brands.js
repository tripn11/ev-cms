export default {
  slug: 'brands',
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

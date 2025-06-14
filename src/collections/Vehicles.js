export default {
  slug: 'vehicles',
  admin: {
    useAsTitle: 'model',
  },
  fields: [
    {
      name: 'model',
      type: 'text',
      required: true,
    },
    {
      name: 'year',
      type: 'select',
      label: 'Year of Model',
      required: true,
      options: Array.from(
        { length: new Date().getFullYear() + 2 - 2018 },
        (_, i) => {
          const year = new Date().getFullYear() + 1 - i;
          return { label: year.toString(), value: year.toString() }; // value as string
        }
      ),
    },
    {
      name: 'brand',
      type: 'relationship',
      relationTo: 'brands',
      required: true,
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      min: 1000,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
    },
    {
      name: 'vehicleType',
      type: 'relationship',
      relationTo: 'vehicle-types',
      required: true,
    },
  ],
};

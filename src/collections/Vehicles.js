export default {
  slug: 'vehicles',
  admin: {
    useAsTitle: 'model',
  },
  access: {
    read:() => true,
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
      label: 'Year',
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
      name: 'images',
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
    {
      name: 'overview',
      type: 'group',
      label: 'Vehicle Overview',
      fields: [
        {
          name: 'fuel_type',
          type: 'select',
          label: 'Fuel Type',
          options: [
            { label: 'Electric', value: 'electric' },
            { label: 'Hybrid', value: 'hybrid' },
          ],
        },
        {
          name: 'body_style',
          type: 'select',
          label: 'Body Style',
          options: [
            { label: 'Sedan', value: 'sedan' },
            { label: 'SUV', value: 'suv' },
            { label: 'Hatchback', value: 'hatchback' },
            { label: 'Coupe', value: 'coupe' },
            { label: 'Convertible', value: 'convertible' },
            { label: 'Truck', value: 'truck' },
            { label: 'Van', value: 'van' },
            { label: 'Wagon', value: 'wagon' },
          ],
        },
        {
          name: 'dimensions(mm)',
          type: 'text',
          label: 'Dimensions(l x B x h)mm',
        },
        {
          name: 'condition',
          type: 'select',
          label: 'Condition',
          options: [
            {label:'New',value:'new'},
            {label:'Foreign used',value:'foreign-used'},
            {label:'Nigerian used',value:'nigerian-used'},

          ]
        },
        {
          name: 'seats',
          type: 'number',
          label: 'Seating Capacity',
          min: 1,
          max: 20,
        },
        {
          name: 'power_output(hp)',
          type: 'number',
          label: 'Power Output (HP)',
          min: 0,
        },
        {
          name: 'battery_capacity(kwh)',
          type: 'number',
          label: 'Battery Capacity (kWh)',
          min: 0,
          step: 0.1,
        },
        {
          name: 'range(km)',
          type: 'number',
          label: 'Range (km)',
          min: 0,
        },
        {
          name: 'drivetrain',
          type: 'select',
          label: 'Drivetrain',
          options: [
            { label: 'Front-Wheel Drive (FWD)', value: 'FWD' },
            { label: 'Rear-Wheel Drive (RWD)', value: 'RWD' },
            { label: 'All-Wheel Drive (AWD)', value: 'AWD' },
            { label: 'Four-Wheel Drive (4WD)', value: '4WD' },
          ],
        },
        {
          name: 'top_speed(km/h)',
          type: 'number',
          label: 'Top Speed (km/h)',
          min: 0,
        },
        {
          name: 'acceleration(0-100)s',
          type: 'number',
          label: '0-100 km/h (s)',
          min: 0,
          step: 0.1,
        },
      ],
    },
  ],
};

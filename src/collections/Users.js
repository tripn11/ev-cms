export default {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'firstName',
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'Admin',
      options: [
        { label: 'Administrator', value: 'Admin' },
        { label: 'Developer', value: 'Dev' },
      ],
      access: {
        update: ({ req }) => req.user?.role === 'Dev',
      }
    },
    {
      name: 'firstName',
      type: 'text',
      required: true,
    },
  ],
  access: {
    create: ({ req }) => req.user?.role === 'Dev',
    read: () => true,
    delete: ({ req, id }) => req.user?.role === 'Dev' || req.user?.id === id,
    update: ({ req, id }) => req.user?.role === 'Dev' || req.user?.id === id,
  },
};

/** @type {import('payload/types').CollectionConfig} */

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
      },
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
    delete: (args) => {
      const { req, id } = args;
      return req.user?.role === 'Dev' || req.user?.id === id;
    },

    update: (args) => {
      const { req, id } = args;
      return req.user?.role === 'Dev' || req.user?.id === id;
    },

  },
};

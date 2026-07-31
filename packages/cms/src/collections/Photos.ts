import type { CollectionConfig } from 'payload'

import { isAdmin } from '../shared/utilities/isAdmin'

export const Photos: CollectionConfig = {
  slug: 'photos',
  admin: {
    useAsTitle: 'date',
  },
  access: {
    admin: isAdmin,
    create: isAdmin,
    delete: isAdmin,
    read: () => true,
    update: isAdmin,
  },
  upload: {
    adminThumbnail: 'thumbnail',
    formatOptions: {
      format: 'avif',
    },
    imageSizes: [
      {
        fit: 'inside',
        formatOptions: {
          format: 'avif',
        },
        height: 400,
        name: 'thumbnail',
        width: 400,
      },
    ],
    mimeTypes: ['image/*'],
    resizeOptions: {
      fit: 'inside',
      height: 1920,
      width: 1920,
    },
  },
  fields: [
    { name: 'date', type: 'date', required: true },
    { name: 'area', type: 'relationship', relationTo: 'areas', required: true },
    { name: 'tags', type: 'relationship', relationTo: 'tags', hasMany: true },
  ],
}

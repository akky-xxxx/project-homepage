import type { CollectionConfig } from 'payload'

export const Photos: CollectionConfig = {
  slug: 'photos',
  admin: {
    useAsTitle: 'imageId',
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'imageId', type: 'text', required: true, unique: true },
    { name: 'date', type: 'date', required: true },
    { name: 'area', type: 'relationship', relationTo: 'areas', required: true },
    { name: 'tags', type: 'relationship', relationTo: 'tags', hasMany: true },
  ],
}

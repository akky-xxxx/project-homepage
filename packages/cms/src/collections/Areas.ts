import type { CollectionConfig } from 'payload'

import { isAdmin } from '../shared/utilities/isAdmin'

export const Areas: CollectionConfig = {
  slug: 'areas',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    admin: isAdmin,
    create: isAdmin,
    delete: isAdmin,
    read: () => true,
    update: isAdmin,
  },
  fields: [{ name: 'name', type: 'text', required: true, unique: true }],
}

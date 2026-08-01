import type { PayloadRequest } from 'payload'

export const isAdmin = (args: { req: PayloadRequest }): boolean => args.req.user?.role === 'admin'

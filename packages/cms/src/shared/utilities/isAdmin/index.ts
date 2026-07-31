import type { PayloadRequest } from 'payload'

export const isAdmin = ({ req }: { req: PayloadRequest }): boolean => req.user?.role === 'admin'

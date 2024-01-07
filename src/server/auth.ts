import NextAuth, { NextAuthResult } from 'next-auth';
import { authOptions } from '@/server/authConfig';

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth(authOptions);

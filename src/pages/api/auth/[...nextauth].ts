import NextAuth from 'next-auth';
import { authConfig } from '@/src/app/auth.config';

export default NextAuth(authConfig); 
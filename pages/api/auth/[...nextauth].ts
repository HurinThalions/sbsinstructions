import NextAuth from 'next-auth';
import { authConfig } from '@/app/auth.config';

export default NextAuth(authConfig); 
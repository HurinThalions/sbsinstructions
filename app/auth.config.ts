import type { NextAuthOptions } from 'next-auth';

export const authConfig: NextAuthOptions = {
    pages: {
        signIn: '/auth/signin', // Anmeldeseite
    },
    providers: []
};
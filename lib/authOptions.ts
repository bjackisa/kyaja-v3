import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import { Session, DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: UserRole;
      email: string;
      name?: string | null;
      image?: string | null;
    } & DefaultSession['user']
  }

  interface User {
    role: UserRole;
  }
}

type UserRole = "USER" | "ADMIN" | "SECRETARY"; // Add more roles as needed

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          role: user.role || 'USER', // Default to 'USER' if role is not set
        },
      };
    },
    async signIn({ account, profile }) {
      if (account?.provider === 'google' && profile?.email) {
        try {
          const existingUser = await prisma.user.findUnique({
            where: { email: profile.email },
          });

          if (!existingUser) {
            await prisma.user.create({
              data: {
                name: profile.name,
                email: profile.email,
                image: profile.image,
                role: 'USER', // Set default role for new users
              },
            });
          }
          return true;
        } catch (error) {
          console.error('Error during sign-in:', error);
          return false;
        }
      }
      return false;
    },
  },
  debug: true,
  pages: {
    error: '/error',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
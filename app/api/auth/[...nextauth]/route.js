import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
// import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
// import clientPromise from '@/lib/mongodb';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { logActivity, createActivityDescription } from '@/lib/activityLogger';

export const authOptions = {
  // adapter: MongoDBAdapter(clientPromise), // Temporarily disabled
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        await connectToDatabase();

        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          isAdmin: user.isAdmin,
          isSystemAdmin: user.isSystemAdmin,
          image: user.image,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.isAdmin = user.isAdmin;
        token.isSystemAdmin = user.isSystemAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub;
        session.user.isAdmin = token.isAdmin;
        session.user.isSystemAdmin = token.isSystemAdmin;
      }
      return session;
    },
    async signIn({ user, account, profile, email, credentials }) {
      // Log login activity
      try {
        await logActivity({
          type: 'system',
          action: 'login',
          entityType: 'user',
          entityId: user.id,
          entityName: user.name,
          description: createActivityDescription('system', 'login', user.name),
          user: user,
          metadata: { provider: account?.provider }
        });
      } catch (error) {
        console.error('Error logging login activity:', error);
      }
      return true;
    },
  },
  events: {
    async signOut({ token, session }) {
      // Log logout activity
      try {
        if (token?.sub) {
          await logActivity({
            type: 'system',
            action: 'logout',
            entityType: 'user',
            entityId: token.sub,
            entityName: token.name || 'User',
            description: createActivityDescription('system', 'logout', token.name || 'User'),
            user: { id: token.sub, name: token.name, email: token.email }
          });
        }
      } catch (error) {
        console.error('Error logging logout activity:', error);
      }
    },
  },
  pages: {
    signIn: '/auth/login',
    signUp: '/auth/signup',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/libs/prisma";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (!user) {
          console.error("User not found");
          return null;
        }
        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!passwordMatch) {
          console.error("Password does not match");
          return null;
        }
        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        // Check if user already exists in database based on email
        let existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (!existingUser) {
          // If user does not exist, create a new user using Google account data
          existingUser = await prisma.user.create({
            data: {
              email: user.email,
              name: user.name,
              username: profile.email.split("@")[0], // Generate a username from email prefix
              image: user.image,
              providerAccountId: account.providerAccountId,
            },
          });
        } else if (!existingUser.providerAccountId) {
          // If user exists but is not linked to a Google account, link it
          await prisma.user.update({
            where: { email: user.email },
            data: { providerAccountId: account.providerAccountId },
            
          });
        }

        // Proceed with sign-in after successful linking
        return true;
      }

      // Allow other providers to proceed with sign-in
      return true;
    },

    async jwt({ token, user, account }) {
      // Attach user ID to the JWT token
      if (user) {
        token.id = user.id;
      }

      // If the user signed in with Google, attach googleId to the token
      if (account?.provider === "google") {
        token.googleId = account.providerAccountId;
      }

      return token;
    },

    async session({ session, token }) {
      // Attach user ID to the session object
      session.user.id = token.id;

      // Attach googleId to the session if user signed in with Google
      if (token.googleId) {
        session.user.googleId = token.googleId;
      }

      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

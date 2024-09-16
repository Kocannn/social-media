import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/libs/prisma";

export const authOptions = {
  // adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy : 'jwt',
    maxAge: 30 * 24 * 60 * 60
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials:{
        username: { label: "Username", type: "text", placeholder: "Username"},
        email: { label: "Email", type: "email", placeholder: "Email"},
        password: { label: "Password", type: "password", placeholder: "Password"},
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        })
        if(!user) return null;
        const passwordMatch = await bcrypt.compare(credentials.password, user.password);
        if(!passwordMatch) {
          console.error("password not match");
          return null;
        }
        return user;
      },
      
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  debug: process.env.NODE_ENV === 'development',
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST };
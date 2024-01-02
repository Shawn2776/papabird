import prisma from "@/lib/prisma";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import NextAuth from "next-auth/next";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "you@email.com" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials) return null;

        const { email, password } = credentials;

        const user = await prisma.users.findUnique({
          where: { email },
        });

        if (!user) return null;

        const userPassword = user.hPassword;

        const isValidPassword = bcrypt.compareSync(password, userPassword);

        if (!isValidPassword) return null;

        return user;
      },
    }),
  ],
  pages: {
    signIn: "auth/signin",
    signOut: "auth/signout",
  },
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    async encode({ secret, token }) {
      if (!token) throw new Error("No token to encode");

      return jwt.sign(token, secret);
    },
    async decode({ secret, token }) {
      if (!token) throw new Error("No token to decode");

      const decodedToken = jwt.verify(token, secret);
      if (typeof decodedToken === "string") return JSON.parse(decodedToken);
      return decodedToken;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  callbacks: {
    async session(params = { session, token, user }) {
      if (params.session.user) {
        params.session.user.email = params.token.email;
      }
      return params.session;
    },
    async jwt(params = { token, user, account, profile, isNewUser }) {
      if (params.user) {
        params.token.email = params.user.email;
      }

      return params.token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

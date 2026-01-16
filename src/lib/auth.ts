import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";

const demoUser = {
  id: "demo-user",
  name: "Avery Morgan",
  email: "demo@signalboard.ai",
};

const devSecret =
  process.env.NODE_ENV === "production" ? undefined : "signalboard-dev-secret";

export const authOptions: NextAuthOptions = {
  providers: [
    ...(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET
      ? [
          GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID ?? "",
            clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
          }),
        ]
      : []),
    CredentialsProvider({
      name: "Demo Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        if (
          credentials.email === demoUser.email &&
          credentials.password === "signalboard"
        ) {
          return demoUser;
        }
        return null;
      },
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET ?? devSecret,
  callbacks: {
    async signIn({ user }) {
      if (!user?.email) return false;
      const dbUser = await prisma.user.upsert({
        where: { email: user.email },
        update: {
          name: user.name ?? user.email,
          image: user.image ?? "",
        },
        create: {
          email: user.email,
          name: user.name ?? user.email,
          image: user.image ?? "",
        },
      });
      user.id = dbUser.id;
      return true;
    },
    async jwt({ token, user }) {
      if (user?.id) {
        token.sub = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.sub) {
        session.user = {
          ...session.user,
          id: token.sub,
        } as typeof session.user & { id: string };
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
};

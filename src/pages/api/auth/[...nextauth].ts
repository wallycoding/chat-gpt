import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import prisma from "~/database/prisma";

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const profile = await prisma.profile.findUnique({
        where: { email: user.email! },
      });
      if (!profile) {
        await prisma.profile.create({
          data: {
            email: user.email!,
          },
        });
      }
      return true;
    },
  },
  pages: {
    signIn: "/auth",
    signOut: "/auth",
  },
};

export default NextAuth(authOptions);

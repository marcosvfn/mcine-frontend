import { rootApiServer } from "@/actions/root/RootApiServer";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

async function refreshToken(token: JWT): Promise<JWT> {
  const response = await rootApiServer.post(
    "/auth/refresh",
    {},
    {
      headers: {
        authorization: `Refresh ${token.backendTokens.refreshToken}`,
      },
    }
  );

  return {
    ...token,
    backendTokens: response.data,
  };
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/landing",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Digite aqui...",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const { email, password } = credentials;

        const response = await rootApiServer.post("/auth/login", {
          username: email,
          password,
        });

        if (response.status == 401) {
          return null;
        }

        return response.data;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) return { ...token, ...user };

      if (new Date().getTime() < token.backendTokens.expiresIn) return token;

      return await refreshToken(token);
    },
    async session({ session, token }) {
      session.user = token.user;
      session.backendTokens = token.backendTokens;
      return session;
    },
  },
};

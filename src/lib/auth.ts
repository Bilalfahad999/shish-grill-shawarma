import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import bcrypt from "bcryptjs";

declare module "next-auth" {
  interface User {
    role?: string;
  }
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
      image?: string | null;
    };
  }
}

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;

        // ── Try database first (when configured) ─────────────────────────────
        // Uncomment when Prisma is configured:
        // try {
        //   const { PrismaClient } = await import("@/generated/prisma")
        //   const prisma = new PrismaClient()
        //   const user = await prisma.adminUser.findUnique({ where: { email } })
        //   if (!user) return null
        //   const valid = await bcrypt.compare(password, user.password)
        //   if (!valid) return null
        //   return { id: user.id, email: user.email, name: user.name, role: user.role }
        // } catch {}

        // ── Env-variable fallback (works without database) ───────────────────
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminHash = process.env.ADMIN_PASSWORD_HASH;

        if (adminEmail && adminHash && email === adminEmail) {
          const valid = await bcrypt.compare(password, adminHash);
          if (valid) {
            return {
              id: "env-admin",
              email: adminEmail,
              name: process.env.ADMIN_NAME ?? "Owner",
              role: "OWNER",
            };
          }
        }

        // ── Dev fallback (REMOVE IN PRODUCTION) ──────────────────────────────
        if (
          process.env.NODE_ENV === "development" &&
          email === "admin@shishgrill.com.au" &&
          password === "admin123"
        ) {
          return {
            id: "dev-admin",
            email: "admin@shishgrill.com.au",
            name: "Owner",
            role: "OWNER",
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});

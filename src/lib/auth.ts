import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "admin@tokorowear.id";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "admin123";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        if (credentials.email !== ADMIN_EMAIL) return null;
        if (credentials.password !== ADMIN_PASSWORD) return null;
        return { id: "admin", name: "Admin", email: ADMIN_EMAIL };
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    authorized({ auth, request }) {
      const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");
      const isLoginPage = request.nextUrl.pathname === "/admin/login";
      if (isAdminRoute && !isLoginPage && !auth?.user) return false;
      return true;
    },
  },
  session: { strategy: "jwt" },
});

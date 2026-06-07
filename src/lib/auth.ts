import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const ADMIN_EMAIL = "tokorowear@gmail.com";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    authorized({ auth, request }) {
      const { pathname } = request.nextUrl;

      if (
        pathname === "/admin/login" ||
        pathname === "/admin/unauthorized"
      ) {
        return true;
      }

      if (pathname.startsWith("/admin")) {
        if (!auth?.user) return false;
        if (auth.user.email !== ADMIN_EMAIL) {
          return Response.redirect(
            new URL("/admin/unauthorized", request.url)
          );
        }
      }

      return true;
    },
  },
  session: { strategy: "jwt" },
});

export const ADMIN_EMAIL_CONST = ADMIN_EMAIL;

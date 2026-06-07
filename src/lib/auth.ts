import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const ADMIN_EMAILS = ["tokorowear@gmail.com", "sjhosua19@gmail.com"];

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
        if (!ADMIN_EMAILS.includes(auth.user.email!)) {
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

export const ADMIN_EMAILS_CONST = ADMIN_EMAILS;

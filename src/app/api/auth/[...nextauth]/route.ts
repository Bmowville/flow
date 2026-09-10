import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";
import { resolveAuthUrl } from "@/lib/auth-url";

const authUrl = resolveAuthUrl(process.env);

if (authUrl) {
  process.env.NEXTAUTH_URL = authUrl;
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

import NextAuth from "next-auth";
import { authOptions } from "../../../authOptions";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

//api/auth/providers
//api/auth/signin
//api/auth/signout

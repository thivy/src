import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      isAdmin: boolean;
      loginProvider: string;
    } & DefaultSession["user"];
  }

  interface User {
    loginProvider: string;
    isAdmin: boolean;
    image: string;
    name: string;
    email: string;
  }
}

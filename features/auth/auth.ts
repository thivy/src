import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      profile: (profile) => {
        return {
          id: profile.id.toString(),
          name: profile.login,
          email: profile.email || "Unknown Email",
          image: profile.avatar_url || "Unknown Image",
          isAdmin: true, // TODO: Set this based on your logic
          loginProvider: "GitHub", // Default provider
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        // User is available during sign-in
        token.id = user.id;
        token.isAdmin = user.isAdmin || false;
        token.loginProvider = user.loginProvider;
      }
      return token;
    },
    session({ session, token }) {
      session.user.loginProvider = String(token.loginProvider) || ""; // Ensure loginProvider is a string
      session.user.isAdmin = Boolean(token.isAdmin); // Set isAdmin to true by default
      return session;
    },
  },
});

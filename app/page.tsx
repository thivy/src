import { signIn, signOut } from "@/features/auth";

export default async function Home() {
  return (
    <div>
      <div></div>
      <h1>Welcome to the Azure Chat App</h1>
      <p>You are being redirected to sign in...</p>
      <form
        action={async () => {
          "use server";
          await signIn("github", {
            redirectTo: "/home",
          });
        }}
      >
        <button type="submit">Signin with GitHub</button>
      </form>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">Sign out of GitHub</button>
      </form>
    </div>
  );
}

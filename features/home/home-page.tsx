import { Button } from "@/components/ui/button";
import { signIn } from "@/features/auth/auth";
import { userIsLoggedIn } from "@/features/auth/auth-guard";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const isLoggedin = await userIsLoggedIn();
  if (isLoggedin) {
    redirect("/home");
  }
  return (
    <div className="relative w-screen h-screen flex flex-col items-center justify-center gap-4">
      {/* Background Image */}
      <Image
        src={"/landing-page.png"}
        alt={"Landing Page"}
        fill
        className="object-cover -z-10 opacity-70"
        quality={100}
        loading="eager"
      />

      {/* Content on top */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-4 text-center w-screen h-screen">
        <div className="flex flex-col bg-card/70 backdrop-blur-3xl border border-border shadow-md p-10 rounded-2xl container max-w-sm min-h-2/3 ">
          <h1 className="tracking-tight text-foreground text-4xl font-bold">
            Azure Chat
          </h1>
          <p className="tracking-tight">
            Powered by{" "}
            <span className="text-transparent font-semibold bg-clip-text bg-gradient-to-r from-blue-500 to-pink-500">
              Azure AI Foundry
            </span>
          </p>
          <div className="flex-1"></div>
          <form
            action={async () => {
              "use server";
              await signIn("github", {
                redirectTo: "/home",
              });
            }}
            className="flex flex-col gap-6 text-left"
          >
            <div>
              <p className="tracking-tight text-sm ">
                Login to your account using SSO
              </p>
            </div>
            <Button type="submit">Login with GitHub</Button>
          </form>
        </div>
      </div>
    </div>
  );
}

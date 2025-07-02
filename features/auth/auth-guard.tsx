import { redirect } from "next/navigation";
import { auth } from "./auth";

export const GuardWithAuth = async (props: React.PropsWithChildren) => {
  const { children } = props;
  const session = await auth();
  if (!session) {
    redirect("/");
  }
  return <>{children}</>;
};

export const userIsLoggedIn = async (): Promise<boolean> => {
  const session = await auth();
  return !!session;
};

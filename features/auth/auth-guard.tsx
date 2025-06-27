import { redirect } from "next/navigation";
import { auth } from ".";

export const GuardWithAuth = async (props: React.PropsWithChildren) => {
  const { children } = props;
  const session = await auth();
  if (!session) {
    redirect("/");
  }
  return <>{children}</>;
};

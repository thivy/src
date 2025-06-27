"use server";

import { signOut } from "../../auth";

export const signOutAndRedirect = async (): Promise<boolean> => {
  return await signOut({
    redirectTo: "/",
    redirect: true,
  });
};

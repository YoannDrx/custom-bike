import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "./auth";

export const getSession = async () => {
  return auth.api.getSession({ headers: await headers() });
};

export const getUser = async () => {
  const session = await getSession();
  return session?.user ?? null;
};

export const getRequiredUser = async () => {
  const user = await getUser();
  if (!user) redirect("/sign-in");
  return user;
};

export const getRequiredAdmin = async () => {
  const user = await getRequiredUser();
  if (user.role !== "admin") redirect("/");
  return user;
};

export const isAdmin = async () => {
  const user = await getUser();
  return user?.role === "admin";
};

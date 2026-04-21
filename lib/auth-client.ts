"use client";

import { adminClient, emailOTPClient, lastLoginMethodClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL:
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_APP_URL,
  plugins: [emailOTPClient(), adminClient(), lastLoginMethodClient()],
});

export const { signIn, signUp, signOut, useSession, getSession } = authClient;

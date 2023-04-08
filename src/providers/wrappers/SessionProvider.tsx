"use client";
import { SessionProvider as NextSessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface SessionProviderProps {
  children: ReactNode;
}

const SessionProvider = ({ children }: SessionProviderProps) => {
  return <NextSessionProvider>{children}</NextSessionProvider>;
};

export default SessionProvider;

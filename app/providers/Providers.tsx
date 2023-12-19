"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import ToastProvider from "./ToastProviders";
import { SessionProvider } from "next-auth/react";
import ModalsProviders from "./ModalsProviders";

interface ProviderProps {
  children: ReactNode;
}

export default function Providers(props: ProviderProps) {
  const { children } = props;
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <ToastProvider />
        <ModalsProviders />
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}

import "~/assets/css/globals.css";
import { Inter } from "next/font/google";
import SessionProvider from "~/providers/wrappers/SessionProvider";
import StoreProvider from "~/providers/wrappers/StoreProvider";

const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={inter.className}>
      <head />
      <body className="bg-slate-900">
        <SessionProvider>
          <StoreProvider>{children}</StoreProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

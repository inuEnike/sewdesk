import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { AppContextProvider } from "@/context/AppContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SewDesk",
  description: "SewDesk — Tailor business management made simple.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const queryClient = new QueryClient();
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
      data-qb-installed="true"
    >
      <body>
        <QueryClientProvider client={queryClient}>
          <Analytics />
          <AppContextProvider>{children}</AppContextProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}

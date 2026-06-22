import type { Metadata } from "next";
import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/layout/sidebar";
import { ModalProvider } from "@/components/ui/modal";
import { SidebarProvider } from "@/hooks/use-sidebar";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://yourproductiondomain.com'),
  title: {
    default: 'Aplicate | Your Career Companion',
    template: '%s | Aplicate',
  },
  description: 'The global description of your SaaS app for search engines.',
  openGraph: {
    title: 'Aplicate',
    description: 'Your personal job applications tracker with automatic email sync.',
    url: 'https://aplicate.app',
    siteName: 'Aplicate',
    images: [
      {
        url: '/lightLogo.png',
        width: 256,
        height: 256,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${jakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex">
        <SidebarProvider>
          <ModalProvider>
            <div className="flex w-full md:hidden items-center justify-center text-center">
              <h1>
                This website is best viewed on desktop sorry for the inconvenience.
              </h1>
            </div>
            <div className="hidden md:flex h-screen w-screen overflow-hidden">
              <Sidebar />
              <div className="flex-1 flex flex-col h-full overflow-y-auto bg-background ">
                <div className="flex-1">
                  {children}
                  <Script
                    src="https://assets.lemonsqueezy.com/lemon.js"
                    strategy="afterInteractive"
                  />
                </div>
                <div className="h-0 w-full shrink-0" aria-hidden="true" />
              </div>
            </div>
          </ModalProvider>
          <Analytics />
        </SidebarProvider>
      </body>
    </html>
  );
}

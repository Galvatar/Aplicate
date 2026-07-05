import type { Metadata } from "next";
import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/layout/sidebar";
import { ModalProvider } from "@/components/ui/modal";
import { SidebarProvider } from "@/hooks/use-sidebar";
import MobileNavbar from "@/components/layout/mobileNavbar";
import AnalyticsWrapper from "@/components/layout/analyticsWrapper";

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

const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://aplicate.app';

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: 'Aplicate | Job applications tracker',
    template: '%s | Aplicate',
  },
  applicationName: "Aplicate",
  description: 'The job applications tracker designed for Australians and New-Zealanders.',
  openGraph: {
    title: 'Aplicate',
    description: 'Your personal job applications tracker with automatic email sync.',
    url: appUrl,
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
  keywords: [
    "job applications tracker", 
    "career board", 
    "interview tracker", 
    "aplicate", 
    "applicate",
    "student job tracker",
    "student application tracker",
    "applications tracker",
    "email application tracker"
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'Aplicate',
    'alternateName': 'Applicate',
    'url': 'https://aplicate.com',
    'description': 'A local-storage sandbox job application dashboard and browser extension for developers.',
    'applicationCategory': 'BusinessApplication',
    'operatingSystem': 'Windows, macOS, Linux, Chrome OS',
    'browserRequirements': 'Requires HTML5 compatible browser',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD',
    },
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${jakartaSans.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          // aicop-ignore security/xss-vulnerabilities
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex">
        <SidebarProvider>
          <ModalProvider>
            {/* <div className="flex w-full md:hidden items-center justify-center text-center">
              <h1>
                This website is best viewed on desktop sorry for the inconvenience.
              </h1>
            </div> */}
            <div className="flex h-screen w-screen overflow-hidden">
              <Sidebar />
              <div className="flex-1 flex flex-col h-full overflow-y-auto bg-background ">
                <div className="flex-1">
                  {children}
                </div>
                <div className="h-15 md:h-0 w-full shrink-0" aria-hidden="true" />
                <MobileNavbar />
              </div>
            </div>
          </ModalProvider>
          <AnalyticsWrapper />
        </SidebarProvider>
      </body>
    </html>
  );
}

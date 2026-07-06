"use client";

import Script from "next/script";
import { useUser } from "@/hooks/use-user";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function RedditPixel() {
  const { user } = useUser();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined" && window.rdt && user?.email) {
      window.rdt('init', 'a2_j9nz9klco3os', {
        email: user.email,
        externalId: user.id
      });
    }
  }, [user]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.rdt) {
      window.rdt('track', 'PageVisit');
    }
  }, [pathname]);

  return (
    <Script id="reddit-pixel" strategy="afterInteractive">
      {`
        !function(w,d){if(!w.rdt){var p=w.rdt=function(){p.sendEvent?p.sendEvent.apply(p,arguments):p.callQueue.push(arguments)};p.callQueue=[];var t=d.createElement("script");t.src="https://www.redditstatic.com/ads/pixel.js",t.async=!0;var s=d.getElementsByTagName("script")[0];s.parentNode.insertBefore(t,s)}}(window,document);
        
        rdt('init', 'a2_j9nz9klco3os'); 
      `}
    </Script>
  );
}
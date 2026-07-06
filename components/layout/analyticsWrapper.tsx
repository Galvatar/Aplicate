'use client'; 

import { Analytics } from '@vercel/analytics/react';

export default function AnalyticsWrapper() {
  return (
    <Analytics 
      beforeSend={(event) => {
        if (window.location.hostname === 'localhost') {
          return null;
        }

        if (typeof window !== 'undefined' && localStorage.getItem('block_vercel_analytics') === 'true') {
          return null;
        }

        return event;
      }}
    />
  );
}
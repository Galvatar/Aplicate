'use client'; // This flags it for client-side execution

import { Analytics } from '@vercel/analytics/react';
import { useEffect, useState } from 'react';

export default function AnalyticsWrapper() {
  const [isDeveloper, setIsDeveloper] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('block_vercel_analytics') === 'true') {
      setIsDeveloper(true);
    }
  }, []);

  if (isDeveloper) return null;

  return (
    <Analytics 
      beforeSend={(event) => {
        if (window.location.hostname === 'localhost') {
          return null;
        }
        return event;
      }}
    />
  );
}
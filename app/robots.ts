import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://aplicate.app';
  
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/vs/', '/job/'],
      disallow: [
        '/api/',
        '/static/',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
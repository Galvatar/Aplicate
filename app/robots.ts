import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://career-flow.com';
  
  return {
    rules: {
      userAgent: '*',
      disallow: [
        '/api/',
        '/_next/',
        '/static/',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
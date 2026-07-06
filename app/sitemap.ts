import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://aplicate.app';
  const competitors = ['teal', 'huntr', 'excel', 'notion'];

  const vsRoutes = competitors.map((comp) => ({
    url: `${baseUrl}/vs/${comp}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const routes = [
    '',
    '/about',
    '/pricing',
    '/privacy',
    '/refund',
    '/terms',
    '/home',
    '/login',
    '/signup',
    '/board',
    '/applications',
    '/statistics',
    '/settings',
    '/create'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return [...routes, ...vsRoutes];
}
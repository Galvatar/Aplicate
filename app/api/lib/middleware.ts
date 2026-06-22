// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const origin = request.headers.get('origin') || '*';

  const corsHeaders = {
    'Access-Control-Allow-Origin': origin, 
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info',
    'Access-Control-Allow-Credentials': 'true',
    // 1. Defend APIs against MIME-sniffing & Clickjacking systemically
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload'
  };

  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  const response = NextResponse.next();
  
  // 2. Inject security headers into standard API responses
  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  // 3. Omit or overwrite server identifying infrastructure info
  response.headers.set('Server', 'webserver');

  return response;
}

export const config = {
  matcher: '/api/:path*',
};
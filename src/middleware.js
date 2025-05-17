// middleware.js
import { NextResponse } from 'next/server';

export function middleware(req) {
  const url = req.nextUrl.clone();
  const { pathname } = req.nextUrl;

  // Define protected paths
  const protectedPaths = [
    '/AppoinmentList',
    '/CategoryList',
    '/CreateCategory',
    '/CreateGallery',
    '/CreateHero',
    '/CreatePortfolio',
    '/DashHome',
    '/GalleryList',
    '/HeroList',
    '/PortfolioList',
    '/UpdateCategory',
    '/UpdateGallery',
    '/UpdateHero',
    '/UpdatePortfolio',
  ];

  // Check if any of the path segments match a protected path
  const isProtected = protectedPaths.some(path =>
    pathname.startsWith(path) || pathname.includes(`/${path}`)
  );

  const cookie = req.cookies.get('authorizedAdmin');
  const isAuthorized = cookie?.value === 'true';

  if (isProtected && !isAuthorized) {
    url.pathname = '/Adminauth';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Specify paths for the middleware to match
export const config = {
  matcher: [
    '/:path*', // Match all routes to apply protection check
  ],
};

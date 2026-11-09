const publicRoutes = [
  '/', '/about', '/contact', '/login', '/register', '/reset-password',
  '/solutions', '/value-propositions', '/biztools', '/bizgenie', '/faq',
  '/shop', '/products', '/terms', '/privacy', '/cookies', '/security',
  '/defi-leadership', '/coming-soon', '/auth', '/auth-callback',
];

export const isPublicRoute = (pathname: string) =>
  publicRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`));
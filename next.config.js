/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ixyniofgkhhzidivmtrz.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
    // Keep domains for backward compatibility
    domains: [
      'images.unsplash.com', 
      'plus.unsplash.com',
      'ixyniofgkhhzidivmtrz.supabase.co'
    ],
  },
}

module.exports = nextConfig
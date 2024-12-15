import { NextConfig } from 'next'

// This file sets a custom webpack configuration to use your Next.js app
const isS3 = process.env.IS_S3 === 'true'
const isStandalone = process.env.IS_STANDALONE === 'true'
/** @type {import('next').NextConfig} */
let output: any = {}
if (isS3) {
  output.output = 'export'
} else if (isStandalone) {
  output.output = 'standalone'
}

const nextConfig: NextConfig = {
  ...output,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  pageExtensions: ['ts', 'tsx'],
  reactStrictMode: false,
  trailingSlash: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: 'utfs.io',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'scontent-dub4-1.cdninstagram.com',
        port: '',
        pathname: '/**',
      },
      {
        hostname: 'img.freepik.com',
      },
    ],
    // unoptimized: true,
  },
}

export default nextConfig

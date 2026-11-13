/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // Argon was removed; send old links to the project list.
      { source: "/projects/argon", destination: "/projects", permanent: true },
    ];
  },
};

export default nextConfig;

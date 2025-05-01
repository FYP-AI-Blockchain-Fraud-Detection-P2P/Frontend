/** @type {import('next').NextConfig} */
const nextConfig = {
    allowedDevOrigins: [
        'http://192.168.253.218', // Add the origin causing the request
        'http://192.168.253.218:3000', // Include port if needed (e.g., Next.js default port)
    ],
};

export default nextConfig;

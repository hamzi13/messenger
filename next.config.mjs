/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        swcPlugins: [
            ["next-superjson-plugin", {}],
        ]
    },
    // images: {
    //     remotePatterns: [
    //        "res.cloudinary.com",
    //        "avatars.githubusercontent.com",
    //        "lh3.googleusercontent.com"
    //     ],
    // },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            },
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
            },
        ],
    }
};

export default nextConfig;

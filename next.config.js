/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['a.storyblok.com', 'res.cloudinary.com','lh3.googleusercontent.com'],
  },  
}

module.exports = nextConfig

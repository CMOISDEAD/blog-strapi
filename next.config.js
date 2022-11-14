/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		loader: "default",
		domains: ["strapi-blog-mara.fly.dev"],
	},
};

module.exports = nextConfig;

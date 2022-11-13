/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		loader: "default",
		domains: ["strapiblog.fly.dev"],
	},
};

module.exports = nextConfig;

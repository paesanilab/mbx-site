import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: 'export',
    images: {
        loader: "custom",
        loaderFile: "./loader.js"
    }
};

export default nextConfig;

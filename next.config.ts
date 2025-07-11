import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "export",
    images: {
        unoptimized: true,
        loader: "custom",
        loaderFile: "./image_loader.js",
    },
};

export default nextConfig;

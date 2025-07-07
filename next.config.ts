import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: 'export',
    images: {
        loader: "custom",
        loaderFile: "./loader.js"
    },
    basePath: "paesani-mbx-site/"
};

export default nextConfig;

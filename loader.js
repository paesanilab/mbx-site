import nextConfig from "./next.config"

function imageLoader({ src }) {
    return `${nextConfig.basePath}${src}`;
  }
  
  module.exports = imageLoader;

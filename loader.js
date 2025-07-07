import { basePath } from "./next.config";

function imageLoader({ src }) {
    return `${basePath}/${src}`;
  }
  
  module.exports = imageLoader;

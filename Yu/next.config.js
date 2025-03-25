/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export", // Export as static files
    distDir: "extension_build", // Custom output folder for the extension
    images: { unoptimized: true }, // Avoids image optimization issues in extensions
    webpack: (config) => {
      config.output.publicPath = "./"; // Ensures relative paths work in extensions
      return config;
    },
  };
  
  module.exports = nextConfig;
  
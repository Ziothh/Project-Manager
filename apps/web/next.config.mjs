// @ts-check
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env/server.mjs"));


/** @type {import("next").NextConfig} */
const config = {
    experimental: {
        externalDir: true,
        appDir: true
    },
    reactStrictMode: true,
    swcMinify: true,
    i18n: {
        locales: ["en"],
        defaultLocale: "en",
    },

    webpack(webpackConfig) {
        webpackConfig.module.rules.push({
          test: /\.svg$/,
          issuer: {
            // test: /\.(js|ts)x?$/,
           // for webpack 5 use
            and: [/\.(js|ts)x?$/] 
            
          },
          
          use: ['@svgr/webpack'],
        });
    
        return webpackConfig;
    },
};


export default config;

import mdx from "@next/mdx";

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {},
});

// GitHub project pages are served under /<repo>/; set NEXT_PUBLIC_BASE_PATH=/YourRepo when building.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") ?? "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  cleanDistDir: false,
  trailingSlash: true,
  basePath: basePath || undefined,
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  transpilePackages: ["next-mdx-remote"],
  experimental: {
    optimizePackageImports: ["@once-ui-system/core"],
  },
  webpack: (config, { webpack }) => {
    // Once UI's ClientFlex/ClientGrid import useLayout from the package root,
    // which drags its charts, code highlighter and emoji data (~1 MB) into
    // every page. Point that import at the provider that defines it.
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(/^\.\.$/, (resource) => {
        if (/@once-ui-system[\\/]core[\\/]dist[\\/]components[\\/]Client(Flex|Grid)\.js$/.test(resource.contextInfo?.issuer ?? "")) {
          resource.request = "../contexts/LayoutProvider.js";
        }
      }),
    );
    // Next still bundles every "use client" module Once UI's barrels reach,
    // its chart components among them. The site draws no charts, and
    // recharts is only touched inside those components, so stub it out.
    config.resolve.alias = { ...config.resolve.alias, recharts: false };
    // The package has no "sideEffects" field, so webpack keeps every module its
    // barrels re-export. Its JS has none (styles come from CSS modules).
    config.module.rules.push({
      test: /@once-ui-system[\\/]core[\\/]dist[\\/].*\.js$/,
      sideEffects: false,
    });
    return config;
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.google.com",
        pathname: "**",
      },
    ],
  },
  sassOptions: {
    compiler: "modern",
    silenceDeprecations: ["legacy-js-api"],
  },
};

export default withMDX(nextConfig);

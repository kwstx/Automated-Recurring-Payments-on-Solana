import type { NextConfig } from "next";

import { withSentryConfig } from "@sentry/nextjs";

const nextConfig = {
  /* config options here */
  reactCompiler: true,
  sentry: {
    hideSourceMaps: true,
    widenClientFileUpload: true,
    tunnelRoute: "/monitoring",
    disableLogger: true,
  },
};

export default withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  // Suppresses source map uploading logs during build
  silent: true,
  org: "solana-subscription-billing",
  project: "frontend",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  async redirects() {
    return [
      {
        source: "/scheduling-in-react",
        destination: "/blog/scheduling-in-react",
        permanent: true,
      },
      {
        source: "/note/engineering/ml/embeddings",
        destination: "/note/engineering/ai/embeddings",
        permanent: true,
      },
      {
        source: "/note/engineering/ml/jaccard-similarity",
        destination: "/note/engineering/ai/jaccard-similarity",
        permanent: true,
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.gravatar.com",
      },
    ],
  },
};

module.exports = nextConfig;

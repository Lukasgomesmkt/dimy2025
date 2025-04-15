/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60, // 1 minuto
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['react-icons', 'date-fns', 'chart.js'],
    serverActions: {
      bodySizeLimit: '2mb',
    },
    serverComponentsExternalPackages: ['bcryptjs'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  swcMinify: true,
  poweredByHeader: false,
  compress: true,
  // Otimizações de performance do servidor
  serverRuntimeConfig: {
    // Aumentar o limite de memória para o Node.js
    NODE_OPTIONS: '--max-old-space-size=4096',
  },
  // Otimizações de cache
  onDemandEntries: {
    // Período (em ms) em que a página será mantida em memória
    maxInactiveAge: 60 * 60 * 1000, // 1 hora
    // Número de páginas que devem ser mantidas em memória
    pagesBufferLength: 5,
  },
  // Otimizações de webpack
  webpack: (config, { dev, isServer }) => {
    // Otimizações apenas para produção
    if (!dev) {
      // Otimizar tamanho do bundle
      config.optimization.minimize = true;

      // Dividir chunks para melhor cache
      config.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: 25,
        minSize: 20000,
      };
    }

    return config;
  },
};

module.exports = nextConfig;

module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          extensions: ['.ts', '.tsx'],
          alias: {
            '@/ad-hocs': './src/ad-hocs',
            '@/assets': './src/assets',
            '@/components': './src/components',
            '@/contexts': './src/contexts',
            '@/exceptions': './src/exceptions',
            '@/graphql': './src/graphql',
            '@/hooks': './src/hooks',
            '@/mechanisms': './src/mechanisms',
            '@/models': './src/models',
            '@/render-props': './src/render-props',
            '@/utils': './src/utils]'
          },
        },
      ],
    ],
  };
};

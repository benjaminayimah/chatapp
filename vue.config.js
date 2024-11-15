const { defineConfig } = require('@vue/cli-service');
const webpack = require('webpack');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      fallback: {
        path: require.resolve('path-browserify'),
        os: require.resolve('os-browserify/browser'),
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
      },
    },
    plugins: [
      new webpack.ProvidePlugin({
        process: 'process/browser',
        Buffer: ['buffer', 'Buffer']
      }),
      new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: JSON.stringify(true), // or false
        __VUE_PROD_DEVTOOLS__: JSON.stringify(false), // or true based on your needs
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false), // Add this line to remove the warning
      }),
    ],
  },
  pwa: {
    name: 'Artemis ai',
    shortName: 'Artemis ai',
    themeColor: '#0f0f10',
    msTileColor: '#ffffff',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black'
  }
});

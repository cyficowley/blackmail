module.exports = {
  transpileDependencies: [
    'vuetify',
  ],
  devServer: {
    watchOptions: {
      poll: true,
    },
  },
  configureWebpack: {
    devtool: 'source-map',
  },
};

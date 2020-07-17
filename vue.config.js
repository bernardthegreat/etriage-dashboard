module.exports = {
  publicPath: "/etriage-dashboard/",
  configureWebpack: { output: { filename: "[name].[hash].bundle.js" } },

  pwa: {
    themeColor: '#4261DD'
  }
};

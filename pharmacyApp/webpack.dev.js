const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  plugins: [],
  devServer: {
    port: 8080,
    static: "./",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    historyApiFallback: true,
    proxy: {
      "/api": "http://localhost:9000",
    },
  },
});

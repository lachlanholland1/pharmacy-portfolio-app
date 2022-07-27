var path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "developement",
  entry: path.join(__dirname, "src", "index.js"),
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
    }),
  ],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "index.bundle.js",
    publicPath: "/",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["transform-es2015-arrow-functions"],
          },
        },
      },
      {
        test: /.(scss|css)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.txt$/,
        loader: "raw-loader",
      },
      {
        test: /\.html$/,
        loader: "html-loader",
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: "file-loader",
      },
      {
        test: /\.svg$/,
        use: "@svgr/webpack",
      },
    ],
  },
};

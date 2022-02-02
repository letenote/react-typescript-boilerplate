const webpack = require("webpack");
const commonPaths = require("./paths");

module.exports = {
  mode: "development",
  output: {
    filename: "[name].js",
    publicPath: "/",
    chunkFilename: "[name].js",
  },
  devtool: "inline-source-map",
  devServer: {
    static: {
      directory: commonPaths.outputPath_dev,
    },
    compress: true,
    historyApiFallback: true,
    https: false,
    open: true,
    hot: true,
    port: 9002,
    proxy: {
      "/api": "http://localhost:9000",
    },
    devMiddleware: {
      writeToDisk: true,
    },
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                // If you are using less-loader@5 please spread the lessOptions to options directly
                modifyVars: {
                  "primary-color": commonPaths.antdModifyVar["primary-color"],
                  "link-color": commonPaths.antdModifyVar["link-color"],
                  "border-radius-base":
                    commonPaths.antdModifyVar["border-radius-base"],
                  "font-size-base": commonPaths.antdModifyVar["font-size-base"],
                },
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              modules: true,
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
};

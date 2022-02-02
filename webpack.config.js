// const path = require("path");
// const webpack = require("webpack");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

// module.exports = {
//   entry: "./src/index.tsx",
//   output: { path: path.join(__dirname, "build"), filename: "index.bundle.js" },
//   mode: process.env.NODE_ENV || "development",
//   resolve: {
//     extensions: [".tsx", ".ts", ".js"],
//   },
//   devServer: {
//     // contentBase: path.join(__dirname, "src"),
//     static: {
//       directory: path.join(__dirname, "src"),
//     },
//     compress: true,
//     historyApiFallback: true,
//     https: false,
//     open: true,
//     hot: true,
//     port: 9002,
//     proxy: {
//       "/api": "http://localhost:9000",
//     },
//     devMiddleware: {
//       writeToDisk: true,
//     },
//   },
//   module: {
//     rules: [
//       {
//         test: /\.(js|jsx)$/,
//         exclude: /node_modules/,
//         use: ["babel-loader"],
//       },
//       {
//         test: /\.(ts|tsx)$/,
//         exclude: /node_modules/,
//         use: ["ts-loader"],
//       },
//       {
//         test: /\.(css|scss)$/,
//         use: ["style-loader", "css-loader", "css-modules-typescript-loader"],
//       },
//       {
//         test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
//         use: ["file-loader"],
//       },
//     ],
//   },
//   plugins: [
//     new webpack.HotModuleReplacementPlugin(),
//     new HtmlWebpackPlugin({
//       template: path.join(__dirname, "src", "index.html"),
//     }),
//     new ForkTsCheckerWebpackPlugin({
//       async: false,
//     }),
//   ],
// };

const { merge } = require("webpack-merge");
const common = require("./webpack/webpack.common");

const envs = {
  development: "dev",
  production: "prod",
};
const env = envs[process.env.NODE_ENV || "development"];
const envConfig = require(`./webpack/webpack.${env}.js`);
module.exports = merge(common, envConfig);

const commonPaths = require("./paths");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const zlib = require("zlib");

module.exports = {
  mode: "production",
  output: {
    filename: `${commonPaths.jsFolder}/[hash].[name].js`,
    path: commonPaths.outputPath_prod,
    publicPath: "/",
    chunkFilename: `${commonPaths.jsFolder}/[chunkhash].[name].js`,
  },
  devtool: false,
  performance: {
    hints: "warning",
    assetFilter(assetFilename) {
      return assetFilename.endsWith(".js.gz");
    },
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
    ],
    runtimeChunk: {
      name: "chunk",
    },
    splitChunks: {
      cacheGroups: {
        antd: {
          test: /[\\/]node_modules[\\/](antd)[\\/]/,
          name: "antd",
          chunks: "all",
        },
        core: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: "core",
          chunks: "all",
        },
        utilVendor: {
          test: /[\\/]node_modules[\\/](lodash|moment|moment-timezone)[\\/]/,
          name: "utilVendor",
          chunks: "all",
        },
        vendors: {
          test: /[\\/]node_modules[\\/](!antd)(!react)(!react-dom)(!lodash)(!moment)(!moment-timezone)[\\/]/,
          name: "vendors",
          chunks: "initial",
        },
        async: {
          test: /[\\/]node_modules[\\/](!antd)(!react)(!react-dom)(!lodash)(!moment)(!moment-timezone)[\\/]/,
          name: "async",
          chunks: "async",
          minChunks: 4,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(css|s[ac]ss)$/i,
        use: [
          MiniCssExtractPlugin.loader,
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
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: false,
            },
          },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                // If you are using less-loader@5
                // please spread the lessOptions to options directly
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
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: `${commonPaths.cssFolder}/[chunkhash].[name].css`,
      chunkFilename: `${commonPaths.cssFolder}/[chunkhash].[name].css`,
    }),
    new WebpackManifestPlugin({
      fileName: commonPaths.assetManifest,
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: commonPaths.manifest, to: commonPaths.outputPath_prod },
        { from: commonPaths._redirects, to: commonPaths.outputPath_prod },
      ],
    }),
    new CompressionPlugin({
      filename: "[path][base].gz",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 8192,
      minRatio: 0.8,
    }),
    new CompressionPlugin({
      filename: "[path][base].br",
      algorithm: "brotliCompress",
      test: /\.(js|css|html|svg)$/,
      compressionOptions: {
        params: {
          [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
        },
      },
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],
};

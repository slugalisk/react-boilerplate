const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");

module.exports = (env, argv) => {
  const scriptModuleRule = {
    test: /\.tsx?$/,
    use: [
      {
        loader: "ts-loader",
        options: {
          transpileOnly: true,
        },
      },
    ],
    exclude: /node_modules/,
  };

  const styleModuleRule = {
    test: /\.s?css$/,
    use: [
      "css-loader",
      "resolve-url-loader",
      {
        loader: "postcss-loader",
        options: {
          postcssOptions: {
            plugins: ["autoprefixer"],
          },
        },
      },
      "sass-loader",
    ],
  };

  const staticModuleRule = {
    test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg)$/i,
    use: [
      {
        loader: "url-loader",
        options: {
          limit: 8192,
        },
      },
    ],
  };

  const plugins = [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      chunks: ["index"],
      title: "Loading...",
      favicon: path.resolve(__dirname, "assets", "favicon.ico"),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ];

  if (argv.mode === "production") {
    scriptModuleRule.use = ["ts-loader"];

    styleModuleRule.use.unshift(MiniCssExtractPlugin.loader);

    plugins.push(
      new MiniCssExtractPlugin({
        filename: "[name].[contenthash].css",
        chunkFilename: "[id].[contenthash].css",
      })
    );
  } else {
    styleModuleRule.use.unshift("style-loader");
  }

  return [
    {
      entry: {
        index: path.join(__dirname, "src", "index.tsx"),
      },
      devtool: "inline-source-map",
      output: {
        filename: "[name].[hash].js",
        chunkFilename: "[id].[chunkhash].js",
        path: path.resolve(__dirname, "dist", "web"),
        publicPath: "/",
      },
      devServer: {
        https: true,
        hot: true,
        historyApiFallback: {
          index: "/",
        },
        host: "0.0.0.0",
      },
      module: {
        rules: [
          scriptModuleRule,
          styleModuleRule,
          staticModuleRule,
          {
            test: /\.wasm$/,
            loader: "file-loader",
          },
        ],
      },
      node: {
        fs: false,
      },
      resolve: {
        extensions: [".tsx", ".ts", ".js"],
      },
      optimization: {
        minimizer: [
          new TerserPlugin({
            cache: true,
            parallel: true,
          }),
        ],
      },
      plugins,
    },
  ];
};

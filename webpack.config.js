import HtmlWebpackPlugin from 'html-webpack-plugin';
import * as path from 'path';
import { fileURLToPath } from 'url';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const buildPath = path.resolve(__dirname, 'dist');

const isProd = process.env.NODE_ENV === 'production';

const getSettingsForStyles = (withModules = false) => {
  return [
    MiniCssExtractPlugin.loader,
    !withModules
      ? 'css-loader'
      : {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: !isProd ? '[path][name]__[local]' : '[hash:base64]',
            },
          },
        },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: ['autoprefixer'],
        },
      },
    },
    'sass-loader',
  ];
};

export default {
  entry: path.resolve(__dirname, './src/index.tsx'),
  target: !isProd ? 'web' : 'browserslist',
  output: {
    path: buildPath,
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.(png|svg|jpg)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
      {
        test: /\.module\.s?css$/,
        use: getSettingsForStyles(true),
      },
      {
        test: /\.s?css$/,
        exclude: /\.module\.s?css$/,
        use: getSettingsForStyles(),
      },
      {
        test: /\.[t]sx?/,
        use: 'babel-loader',
      },
    ],
  },

  devServer: {
    host: 'localhost',
    port: 3000,
    hot: true,
    historyApiFallback: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '/src/index.html'),
    }),
    !isProd && new ReactRefreshWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name]-[hash].css',
    }),
  ].filter(Boolean),

  resolve: {
    extensions: ['.tsx', '.jsx', '.js', '.ts'],
    alias: {
      components: path.join(__dirname, '/src/components'),
      config: path.join(__dirname, '/src/config'),
      styles: path.join(__dirname, '/src/styles'),
      utils: path.join(__dirname, '/src/utils'),
      App: path.join(__dirname, '/src/App'),
      icons: path.join(__dirname, '/src/icons'),
      store: path.join(__dirname, 'src/store'),
    },
  },
};

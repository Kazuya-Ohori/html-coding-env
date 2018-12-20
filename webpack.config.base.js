import path from 'path';
// import plugins from './postcss.config';

module.exports = {
  context: __dirname,

  cache: true,

  entry: [],

  target: 'web',

  output: {
    path: path.join(__dirname, '.tmp', 'js'),
    // devServerのパス
    publicPath: '/js/',
    filename: '[name].bundle.js',
    chunkFilename: '[chunkhash].js',
    sourceMapFilename: '[name].map'
  },

  module: {
    rules: [{
      enforce: 'pre',
      test: /\.(js)$/,
      loader: 'eslint-loader',
      exclude: /(node_modules)/,
      options : {
          fix : true
      },
      include: __dirname
    }, {
      test: /\.(js)$/,
      use: [
        {
          loader: 'babel-loader'
        }
      ],
      exclude: /node_modules/,
      include: __dirname,
    }, {
      test: /\.(jpg|png|gif|jpeg|svg)([\?]?.*)$/,
      loader: 'url-loader',
      options: {
        limit: 100000
      }
    }, {
      test: /\.css$/,
      use: []
    }, {
      test: /\.json$/,
      use: [
          'json-loader'
      ]
    }]
  },

  resolve:{
    descriptionFiles: ["package.json"],
    enforceExtension: false,
    modules: ['src', 'src/js', 'web_modules', 'node_modules']
  },

  plugins: []
};

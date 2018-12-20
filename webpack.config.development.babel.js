import baseConfig from './webpack.config.base';
import webpack from 'webpack';

const _entry = {
  index: [
    'babel-polyfill',
    './app/scripts/index.js',
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true'
  ]
};

const config = Object.create(baseConfig);
config.entry = _entry;

config.stats = {
  assets: true,
  cached: false,
  cachedAssets: false,
  children: false,
  chunks: false,
  chunkModules: false,
  chunkOrigins: false,
  chunksSort: "field",
  colors: true,
  hash: false,
  // 不要なchunkモジュールのログを消している
  maxModules: 0,
  // これだと消えない・・bug?
  modules: false,
  performance: true,
  publicPath: false
};


config.devtool = '#source-map';
config.plugins.push(
    new webpack.LoaderOptionsPlugin({ debug: true })
);
config.plugins.push(new webpack.HotModuleReplacementPlugin());
config.plugins.push(new webpack.NoEmitOnErrorsPlugin());
config.plugins.push(new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify('development')
}));
config.plugins.push(
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
);

module.exports = config;

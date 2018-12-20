import path from 'path';
import webpack from 'webpack';
import glob from 'glob'
import baseConfig from './webpack.config.base';

const _entry = {
  index: [
    'babel-polyfill',
    './app/scripts/index.js'
  ]
};

const config = Object.create(baseConfig);
config.entry = _entry;
config.output.path = path.join(__dirname, 'dist/', 'js');
config.stats = {
  assets: true,
  cached: false,
  cachedAssets: false,
  children: false,
  chunks: false,
  chunkModules: false,
  chunkOrigins: false,
  chunksSort: 'field',
  colors: true,
  hash: false,
  // 不要なchunkモジュールのログを消している
  maxModules: 0,
  // これだと消えない・・bug?
  modules: false,
  performance: true,
  publicPath: false
};

config.plugins.push(new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
}));

config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({ // Uglify
      mangle: true, // ローカル変数名を短い名称に変更する
      sourcemap: false,
      minimize: false
    })
);

config.plugins.push(
    new webpack.ProgressPlugin((percentage, msg) => {
      process.stdout.write('progress ' + Math.floor(percentage * 100) + '% ' + msg + '\r');
    })
);

config.plugins.push(
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
);

export default config;

import gulp from 'gulp';
import index from 'gulp-index';
import url from 'url';
import path from 'path';
import browserSync from 'browser-sync';
import './gulp/tasks/styles';
import fs from 'fs';
import pug from 'pug';
import webpack from 'webpack';
import webpackDevConfig from './webpack.config.development.babel';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import './gulp/tasks/html';
const devBundler = webpack(webpackDevConfig);

const defaultStatsOptions = {
  colors: true,
  hash: false,
  timings: false,
  chunks: false,
  chunkModules: false,
  modules: false, // reduce log
  children: true,
  version: true,
  cached: true,
  cachedAssets: true,
  reasons: true,
  source: true,
  errorDetails: true
};

browserSync({
  files          : [
    'app/pug/*.pug',
    'app/img/**/*'
  ],
  notify         : false,
  port           : 9000,
  open           : false,
  reloadOnRestart: true,
  ghostMode      : {
    clicks: false,
    forms: false,
    scroll: false
  },
  server         : {
    baseDir: ['.tmp/', 'app/pug/'],
    routes: {
      '/node_modules': 'node_modules'
    },
    middleware: [
      {
        route: '/',
        handle: (req, res, err) => {

          var locals = {files: []}
          const files = fs.readdirSync('./app/pug/');

          files.filter(function(file) { return file.substr(-4) === '.pug' && file !== 'list.pug'; }).forEach(function(file){
              locals.files.push(file.replace('.pug', '.html'));
          });

          // title/更新時間取得
          const titleListArray = files;
          const titleList = titleListArray.filter((file) => {
                              return (file.indexOf('.pug') != -1);
                            });

          const mTime = [];
          const pageTitle = [];

          for (let i = 0; i < titleList.length; i++){

            const getInfo = fs.statSync(`./app/pug/${titleList[i]}`, 'utf8');
            mTime[i] = new Date(getInfo.mtime);

            const getTitle = fs.readFileSync(`./app/pug/${titleList[i]}`, 'utf8');
            const searchTextA = getTitle.indexOf('title');
            const searchTextB = getTitle.indexOf('description');
            const getList = getTitle.slice(searchTextA, searchTextB);
            const sliceTextA = getList.indexOf("\'");
            const sliceTextB = getList.indexOf("\'\n");
            const makeTitle = getList.slice(sliceTextA + 1, sliceTextB);
            pageTitle[i] = makeTitle;
          }

          const dates = mTime.map((arry) => {
            return {
                     year: arry.getFullYear(),
                     month: arry.getMonth() + 1,
                     date: arry.getDate(),
                   };
          });

          let pugData = fs.readFileSync('./app/pug/list.pug', {
              encoding: 'utf-8'
          }, function (err, data) {});

          const result = pug.render(pugData, {
            files: locals.files,
            cache : false,
            dates: dates,
            titles: pageTitle
          });

          fs.writeFileSync('./.tmp/list.html', result, 'utf8');
          res.end(result);
        }
      },
      webpackDevMiddleware(devBundler, {
        publicPath: webpackDevConfig.output.publicPath,
        noInfo: false,
        quiet: false,
        stats: defaultStatsOptions
      }),
      webpackHotMiddleware(devBundler),
      function(req, res, next){
        const requestPath = url.parse(req.url).pathname;
        // .html or / で終わるリクエストだけを対象とする
        if (!requestPath.match(/(\/|\.html)$/)) {
          return next();
        }
        const suffix = path.parse(requestPath).ext ? '': 'list.html'
        // HTMLファイルが存在すれば、HTMLを返す
        const htmlPath = path.join('./.tmp/', requestPath, suffix);
        // pug のファイルパスに変換
        var pugPath = path.join('./app/pug/', requestPath, suffix).replace('.html','.pug');
       
        var pugData = fs.readFileSync(pugPath, {
            encoding: 'utf-8'
        }, function (err, data) {});
        const result = pug.render(pugData, {
            filename: pugPath,
            basedir: './app/pug/',
            pretty: true,
            cache : false
        });
        fs.writeFileSync(htmlPath, result, 'utf8');
        return next();
      }
    ]
  }
});
gulp.run('styles');
gulp.watch('app/styles/**/*.sass', ['styles']);
gulp.watch('app/**/*.pug', ['pug']);


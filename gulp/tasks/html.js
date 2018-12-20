import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import fs from 'fs';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;
const minifyHtmlOpt = {
  conditionals: true, // IE条件コメントを消さない
  loose       : true, // 空白文字を削除しない
  quotes      : true  //クオートを削除しない
};
const pugOptions = {
  pretty: true, //htmlをminifyしない
  cache : true
};
/**
 * pugタスク
 */
gulp.task('pug', () => {
    reload();
});

gulp.task('pug:prod', () => {
    gulp.src([
        'app/pug/**/!(_)*.pug',
        '!app/pug/list.pug'
    ])
    .pipe($.plumber())
    .pipe($.cached('pug'))
    .pipe($.pugLint())
    .pipe($.debug({title: 'pug Compiled:'}))
    .pipe($.pug(pugOptions))
    .pipe(gulp.dest('.tmp/'));
    
    // indexページ生成
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

    gulp.src([
      '.tmp/list.html'
    ])
    .pipe($.debug({title: 'pug Compiled:'}))
    .pipe($.pug({
          cache: false,
          locals: {
              locals: locals,
              dates: dates,
              titles: pageTitle
            }
    }))
    .pipe(gulp.dest('.tmp/'));
});

// ※ gulp js, pugを先に実行しておくこと
gulp.task('html', () => {
    const assets = $.useref({
        searchPath: ['{app, !app/scripts', '.']
    });
    const jsCssAssets = $.useref({
        searchPath: ['.tmp/']
    });

    return gulp.src('.tmp/**/*.html')
    .pipe($.debug())
    .pipe(jsCssAssets)
    .pipe($.if('*.css', $.minifyCss({
            processImport: false,
            compatibility: '*'
    })))
    .pipe(assets)
    .pipe($.useref())
    .pipe(gulp.dest('dist/'));
});

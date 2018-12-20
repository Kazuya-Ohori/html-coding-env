import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import gulpSass from 'gulp-sass';
import styleLint from 'gulp-sass-lint';
import doiuse from 'doiuse';

import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import sprites, { updateRule } from 'postcss-sprites';
import mqpacker from 'css-mqpacker';

import path from 'path';
import browserSync from 'browser-sync';

const $ = gulpLoadPlugins();
const reload = browserSync.stream;

/* プレビューcssの環境変数 */
import sassVariables from 'gulp-sass-variables';
const previewEnvPc = '../../../img/userpc';
const previewEnvPrdPc = '../../../img/userpc/seizo/preview';
const previewEnvSp = '../../../img/usersp';
const previewEnvPrdSp = '../../../img/usersp/seizo/preview';


const browsers = [
  'ie >= 10',
  'ff >= 48',
  'chrome >= 54',
  'safari >= 9',
  'ios >= 8',
  'android >= 4.4',
  'ChromeAndroid >= 52'
];


const processors = [
  autoprefixer({ browsers: browsers, remove: false }),
  sprites({
    stylesheetPath: 'app/css/', //出力するcssのパス
    spritePath: 'app/img',   //スプライト画像を出力する先のパス
    basePath: 'app/',  // urlのベースパス
    relativeTo: 'app',
    retina: true,
    // img/spritesのみスプライトの対象とする
    filterBy(image){
      if(/images\/sprites/.test(image.url)){
        return Promise.resolve();
      }
      return Promise.reject();
    },
    groupBy: function(image) {
      if (image.url.indexOf('@2x') === -1) {
        return Promise.resolve('@1x');
      }
      return Promise.resolve('@2x');
    },
    spritesmith: {
      padding: 10
    },
    hooks: {
      // 出力されるスプライト画像ファイル名を変更する sprite@2xだと同じファイルが量産されるので
      onSaveSpritesheet: function(opts, data) {
        if(data.groups[0] === '@1x'){
          // 通常サイズのスプライト
          return path.join(opts.spritePath, '_sprites.png');
        }else{
          // retinaサイズのスプライト
          return path.join(opts.spritePath, '_sprites@2x.png');
        }
      }
    }
  }),
  mqpacker({ sort: true })
];

const targetSass = [
  '!app/styles/**/_*.sass',
  'app/styles/**/*.sass'
];

gulp.task('stylelint', () => {
  return gulp.src(targetSass[0])
      .pipe(styleLint({
            options: {
              'merge-default-rules': false
            },
            configFile: '.sass-lint.yml'
      }))
      .pipe(styleLint.format())
      .pipe(styleLint.failOnError());
});

gulp.task('styles', ['stylelint'], () => {
  return gulp.src(targetSass)
      .pipe($.plumber())
      .pipe(sassVariables({
        $preview_img_dir_pc: previewEnvPc,
        $preview_img_dir_sp: previewEnvSp
      }))
      .pipe($.sassBulkImport())
      .pipe($.sourcemaps.init())
      .pipe(gulpSass({
        outputStyle: 'expand'
      }))
      .pipe(postcss(processors))
      .pipe($.sourcemaps.write('.'))
      .pipe(gulp.dest('.tmp/css'))
      .pipe(reload({match: "**/*.css"}));
});

gulp.task('styles:design', ['stylelint'], () => {
  return gulp.src(targetSass)
      .pipe($.plumber())
      .pipe(sassVariables({
        $preview_img_dir_pc: previewEnvPc,
        $preview_img_dir_sp: previewEnvSp
      }))
      .pipe($.sassBulkImport())
      .pipe(gulpSass({
        outputStyle: 'compressed'
      }))
      .pipe(postcss(processors))
      .pipe(gulp.dest('.tmp/css'));
});

gulp.task('styles:prod', ['stylelint'], () => {
  return gulp.src(targetSass)
      .pipe($.plumber())
      .pipe(sassVariables({
        $preview_img_dir_pc: previewEnvPrdPc,
        $preview_img_dir_sp: previewEnvPrdSp
      }))
      .pipe($.sassBulkImport())
      .pipe(gulpSass({
        outputStyle: 'compressed'
      }))
      .pipe(postcss(processors))
      .pipe(gulp.dest('.tmp/css'));
});

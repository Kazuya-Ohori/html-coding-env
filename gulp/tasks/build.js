import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import rimraf from 'rimraf';

const $ = gulpLoadPlugins();

// 静的ファイルを移動
gulp.task('extras', () => {
  gulp.src([
    '!app/styles/**/*',
    '!app/scripts/**/*',
    'app/**/!(_)*.*',
    '!app/_element/!(_)*(_)*.*',
    '!app/*.gif',
    '!app/*.jpg',
    '!app/*.pug',
    '!app/*.svg'
  ], {
    dot: true
  }).pipe(gulp.dest('dist/'));

  gulp.src([
      '.tmp/css/**'
  ]).pipe(gulp.dest('dist/css'));

  gulp.src([
    'app/img/**/*.gif',
    'app/img/**/*.jpg',
    'app/img/**/*.png',
    'app/img/**/*.svg'
  ], {
    dot: false
  }).pipe(gulp.dest('dist/img'));
});

gulp.task('clean', (cb) => {
  rimraf('./dist/data', cb);
});

gulp.task('build', ['html', 'extras', 'clean'], () => {
  return gulp.src('dist/**/*')
      .pipe($.size({title: 'build', gzip: true}));
});
gulp.task('build:prod', ['build'], () => {
  return gulp.src('dist/**/*')
      .pipe(gulp.dest('build/'))
      .pipe($.size({title: 'build', gzip: true}));
});

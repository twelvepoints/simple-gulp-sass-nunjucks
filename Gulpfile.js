const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const nunjucksRender = require('gulp-nunjucks-render');

gulp.task('browserSync', () => {
  browserSync.init({
    server: {
      baseDir: 'src'
    },
  })
});

gulp.task('sass', () => (
  gulp.src('src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./src/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
));

gulp.task('nunjucks', function () {
  return gulp.src('src/templates/pages/*.html')
    .pipe(nunjucksRender({
      path: ['src/'] // String or Array
    }))
    .pipe(gulp.dest('src'));
});

// gulp.task('watch', () => {
//   gulp.watch('src/scss/**/*.scss', ['sass'])
//     .on('change', (event) => {
//       console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
//     });
//   gulp.watch('src/*.html', browserSync.reload);
// });

// gulp.task('sass:watch', ['browserSync', 'sass'], () => (
//   gulp
//     .watch('src/scss/**/*.scss', ['sass'])
// ));


// gulp.task('nunjucks:watch', ['browserSync', 'nunjucks'], () => (
//   gulp
//     .watch('src/templates/**/*', ['nunjucks'])
// ));



gulp.task('default', ['browserSync', 'sass', 'nunjucks'], function () {
  //a list of watchers, so it will watch all of the following files waiting for changes
  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch('src/templates/**/*', ['nunjucks']);
});



// // default
// gulp.task('default', ['sass', 'sass:watch', 'nunjucks:watch', 'nunjucks']);


// build
gulp.task('build', ['sass', 'nunjucks']);

var gulp = require('gulp');
var sass = require('gulp-sass');
var minify = require('gulp-minify');
var minifyCSS = require('gulp-csso');
var imagemin = require('gulp-imagemin');
var watch = require('gulp-imagemin');
var browserSync = require('browser-sync').create();

gulp.task('css', function () {
    // Endless stream mode
    return gulp.src('src/style/*.scss')
      .pipe(sass())
      .pipe(minifyCSS())
      .pipe(gulp.dest('public/assets/styles'))
      .pipe(browserSync.stream())
});

gulp.task('compress-img', () =>
    gulp.src('src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('public/assets/images'))
        .pipe(browserSync.stream())
);

gulp.task('compress-js', function() {
  return gulp.src('src/scripts/*.js')
    .pipe(minify({
        ext:{
            src:'-debug.js',
            min:'.js'
        },
        exclude: ['tasks'],
        ignoreFiles: ['.combo.js', '-min.js']
    }))
    .pipe(gulp.dest('public/assets/scripts'))
    .pipe(browserSync.stream());
});



gulp.task('serve', ['compress-js', 'css'], function() {

    browserSync.init({
        server: "./public"
    });

    gulp.watch('src/scripts/*.js', ['compress-js']);
    gulp.watch('src/style/*.scss', ['css']);
    gulp.watch("public/*.html").on('change', browserSync.reload);
});

gulp.task('default', [ 'serve' ]);

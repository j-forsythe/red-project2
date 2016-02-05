var gulp = require('gulp');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var rename = require('gulp-rename');
var jscs = require('gulp-jscs');
// var jshint = require('gulp-jshint');

var sass = require('gulp-sass');
    autoprefixer = require('gulp-autoprefixer');
    cssnano = require('gulp-cssnano');

gulp.task('uglify', function(){
    gulp.src('./js/script.js') // What files do we want gulp to consume?
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(jscs())
		    .pipe(jscs.reporter())
        .pipe(uglify()) // Call the uglify function on these files
        .pipe(rename('main.min.js'))
        .pipe(gulp.dest('./build')); // Where do we put the result?
});

gulp.task('sass', function() {
   gulp.src('./sass/style.scss')
      .pipe(sass())
      .pipe(autoprefixer({
         browsers: ['last 2 versions']
      }))
      .pipe(gulp.dest('./build/css'))
      .pipe(cssnano())
      .pipe(rename('style.min.css'))
      .pipe(gulp.dest('./build/css'));
});

gulp.task('watch', function() {

  browserSync.init({
    server: {
      baseDir: './'
    }
  });

  gulp.watch(['./js/script.js'], ['uglify']);
  gulp.watch('sass/*.scss', ['sass']);
  gulp.watch(['./build/script.js', 'index.html']).on('change', browserSync.reload);
});

gulp.task('default', ['watch', 'uglify']);

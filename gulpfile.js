var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    nib = require('nib'),
    axis = require('axis'),
    lost = require('lost'),
    postcss = require('gulp-postcss'),
    rupture = require('rupture'),
    browserSync = require('browser-sync').create();

gulp.task('task_test', function() {
  return gulp.src('app/stylus/**/*.styl')
    .pipe(stylus({
      use: [nib(), axis(), rupture()]
    }))
    .pipe(postcss([
      lost()
    ]))
    .pipe(gulp.dest('css'));
});




gulp.task('watch', function() {
   return gulp.watch('app/stylus/**/*.styl', ['task_test']);
});

gulp.task('serve', function() {
  browserSync.init({
    server : {BaseDir : 'site_2/'}
  })
 
  browserSync.watch('app/**/*.*').on('change', browserSync.reload);
});

gulp.task('dev', ['watch', 'serve']);
gulp.task('build', ['task_test']);
gulp.task('default', ['build']);

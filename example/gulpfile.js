var gulp = require('gulp'),
  hawkcss = require('./gulp-hawkcss');

gulp.task('default', function() {
  gulp.src('./css*.html')
    .pipe(hawkcss())
    .pipe(gulp.dest('dest/'));
});
#### hawk 前端自动化工具 css抽取

## npm install gulp-hawkcss

~~
	var gulp = require('gulp'),
	  hawkcss = require('./gulp-hawkcss');

	  gulp.task('default', function() {
	    gulp.src('./css*.html')
		    .pipe(hawkcss())
			    .pipe(gulp.dest('dest/'));
				});

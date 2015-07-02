# css合并

## 安装 

### npm install gulp-haskcss

## 示例： 
> http://a.cdn.cn/??assets/a1.css,assets/a2.css,assets/a3.css"


```javascript
var gulp = require('gulp'),
  hawkcss = require('./gulp-hawkcss');

gulp.task('default', function() {
  gulp.src('./css*.html')
    .pipe(hawkcss())
    .pipe(gulp.dest('dest/'));
});
```
asldkfaslfdj

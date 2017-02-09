var gulp = require('gulp');
var babel = require('gulp-babel');
var watch = require('gulp-watch');

gulp.task('build', () => {
  return gulp.src('src/**/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('copytemplate', ()=> {
  gulp.src('src/cssTemplate.hbs').pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
  gulp.watch('src/**/*', ['build', 'copytemplate']);
});
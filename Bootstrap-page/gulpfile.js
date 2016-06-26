var gulp = require('gulp');
var sass = require('gulp-sass'),
    minify = require('gulp-csso');

gulp.task('sass', function () {
    return gulp.src('assets/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
/*        .pipe(minify())*/
        .pipe(gulp.dest('build'));
});

gulp.task('minify', function () {
    gulp.src('build/main.css')
        .pipe(minify())
        .pipe(gulp.dest('build'));
});
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

gulp.task('jsx', function () {
    return gulp.src('app/**/*.jsx')
        .pipe(plugins.babel())
        .pipe(plugins.rename({
            suffix: '.jsx',
            extname: '.js'
        }))
        .pipe(gulp.dest('wwwroot/app'));
});

gulp.task('watch', function () {
    gulp.watch('app/**/*.js', ['jsx']);
    gulp.watch('app/**/*.jsx', ['jsx']);
});

gulp.task('default', ['jsx', 'watch']);

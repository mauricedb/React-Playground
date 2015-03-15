var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var mainBowerFiles = require('main-bower-files');

gulp.task('jsx', function () {
    return gulp.src('app/**/*.jsx')
        .pipe(plugins.babel({
            modules: 'system'
        }))
        .pipe(plugins.rename({
            suffix: '.jsx',
            extname: '.js'
        }))
        .pipe(gulp.dest('wwwroot/app'));
});

gulp.task('js', function () {
    return gulp.src('app/**/*.js')
        .pipe(plugins.babel({
            modules: 'system'
        }))
        .pipe(gulp.dest('wwwroot/app'));
});

gulp.task('mainBowerFiles', function () {

    gulp.src('./node_modules/es6-module-loader/dist/es6-module-loader.js')
        .pipe(gulp.dest('wwwroot/lib/system.js/dist/'));

    return gulp.src(mainBowerFiles(), {
        base: './bower_components'
    }).pipe(gulp.dest('wwwroot/lib/'))
});

gulp.task('watch', function () {
    gulp.watch('app/**/*.js', ['js']);
    gulp.watch('app/**/*.jsx', ['jsx']);
});

gulp.task('default', ['mainBowerFiles', 'jsx', 'js', 'watch']);

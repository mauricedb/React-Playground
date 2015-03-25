var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var mainBowerFiles = require('main-bower-files');

function pack(name){
    return gulp.src('app/' + name + '/' + name + '.jsx')
        .pipe(plugins.webpack({
            module: {
                loaders: [
                    { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
                    { test: /\.jsx$/, exclude: /node_modules/, loader: "babel-loader"}
                ]
            },
            output: {
                filename: name + '.jsx.js'
            }
        }))
        .pipe(gulp.dest('wwwroot/app/' + name));
}

gulp.task('react-only', function () {
    return pack('react-only');
});

gulp.task('react-flux', function () {
    return pack('react-flux');
});

gulp.task('mainBowerFiles', function () {
    return gulp.src(mainBowerFiles(), {
        base: './bower_components'
    }).pipe(gulp.dest('wwwroot/lib/'))
});

gulp.task('watch', function () {
    gulp.watch('app/react-flux/**/*.js*', ['react-flux']);
    gulp.watch('app/react-only/**/*.js*', ['react-only']);
});

gulp.task('default', ['mainBowerFiles', 'react-flux', 'react-only', 'watch']);

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

gulp.task('jsx', function () {
    return gulp.src('app/react-flux/react-flux.jsx')
        //.pipe(plugins.babel())
        .pipe(plugins.webpack({
            module: {
                loaders: [
                    { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
                    { test: /\.jsx$/, exclude: /node_modules/, loader: "babel-loader"}
                ]
            },
            output: {
                filename: 'react-flux.jsx.js'
            }
        }))
        .pipe(gulp.dest('wwwroot/app/react-flux'));
});

gulp.task('watch', function () {
    gulp.watch('app/**/*.js', ['jsx']);
    gulp.watch('app/**/*.jsx', ['jsx']);
});

gulp.task('default', ['jsx', 'watch']);

var gulp = require('gulp');
var bower = require('gulp-bower2');

gulp.task('bower', function() {
    return bower()
        .pipe(gulp.dest('wwwroot/lib/'))
});


gulp.task('default',['bower']);
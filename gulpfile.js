var gulp = require('gulp');
var mainBowerFiles = require('main-bower-files');

gulp.task('mainBowerFiles', function() {
    return gulp.src(mainBowerFiles())
        .pipe(gulp.dest('wwwroot/lib/'))
});

gulp.task('default',['mainBowerFiles']);
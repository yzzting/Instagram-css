var gulp = require('gulp');
var gls = require('gulp-live-server');
var jade = require('gulp-jade');
var less = require('gulp-less')
var cssmin = require('gulp-minify-css');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var server = gls.static('dist', 8000);

gulp.task('less', function() {
    gulp.src(['source/less/main.less'])
        .pipe(less())
        .pipe(cssmin())
        .pipe(postcss([autoprefixer({
            browsers: ['last 2 versions']
        })]))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('jade', function() {
    return gulp.src('./templates/jade/index.jade')
        .pipe(jade())
        .pipe(gulp.dest('./dist/'));
});

gulp.task('serve', function() {
    server.start();
});

gulp.task('watch', ['less', 'jade'], function() {
    gulp.watch(['source/less/*.less'], ['less'])
    gulp.watch(['templates/jade/index.jade'], ['jade'])
})
gulp.task('build', ['jade', 'less']);

gulp.task('server', ['build', 'serve']);

gulp.task('deploy', ['build'], function() {
    return gulp.src('./dist/**/*')
        .pipe(ghPages());
});

gulp.task('defauft', ['server', 'watch']);

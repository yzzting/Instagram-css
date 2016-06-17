var gulp = require('gulp');
var gls = require('gulp-live-server');
var jade = require('gulp-jade');
var less = require('gulp-less')
var cssmin = require('gulp-clean-css');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var server = gls.static('dist', 8000);
var ghPages = require('gulp-gh-pages');
var imagemin = require('gulp-imagemin')

// 压缩图片任务
gulp.task('images', function() {
    gulp.src('source/img/*.*')
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('dist/img'))
});
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

gulp.task('watch', ['less', 'jade', 'images'], function() {
    gulp.watch(['source/less/*.less'], ['less'])
    gulp.watch(['source/less/Filter/*.less'], ['less'])
    gulp.watch(['templates/jade/index.jade'], ['jade'])
    gulp.watch(['source/img/*.*'], ['images'])
})
gulp.task('build', ['jade', 'less', 'images']);

gulp.task('server', ['build', 'serve']);

gulp.task('deploy', ['build'], function() {
    return gulp.src('./dist/**/*')
        .pipe(ghPages());
});

gulp.task('default', ['server', 'watch']);

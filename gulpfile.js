// http://mherman.org/blog/2014/08/14/kickstarting-angular-with-gulp/
var gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    connect = require('gulp-connect'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    minifyCSS = require('gulp-minify-css'),
    clean = require('gulp-clean');

// tasks
gulp.task('lint', function () {
    gulp.src(['./app/**/*.js', '!./app/components/**'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
});
gulp.task('clean', function () {
    gulp.src('./dist/*')
        .pipe(clean({force: true}));
});
gulp.task('minify-css', function () {
    var opts = {comments: true, spare: true};
    gulp.src(['./app/**/*.css', '!./app/components/**'])
        .pipe(minifyCSS(opts))
        .pipe(gulp.dest('./dist/'))
});
gulp.task('minify-js', function () {
    gulp.src(['./app/**/*.js', '!./app/components/**'])
        .pipe(browserify())
        .pipe(uglify({
            // inSourceMap:
            // outSourceMap: "app.js.map"
        }))
        .pipe(gulp.dest('./dist/'))
});
gulp.task('copy-bower-components', function () {
    gulp.src('./app/components/**')
        .pipe(gulp.dest('dist/components'));
});
gulp.task('copy-html-files', function () {
    gulp.src('./app/**/*.html')
        .pipe(gulp.dest('dist/'));
});
gulp.task('connect', ['build'], function () {
    console.log('connect');
    connect.server({
        root: 'app/',
        port: 8080
    });
});
gulp.task('connectDist', ['build'], function () {
    console.log('connectDist');
    connect.server({
        root: 'dist/',
        port: 9090
    });
});

// build task
gulp.task('build',
    ['lint', 'minify-css', 'minify-js', 'copy-html-files',
     'copy-bower-components']
);

// default task
gulp.task('default', ['lint', 'connect'], function () {
    console.log('default');
});

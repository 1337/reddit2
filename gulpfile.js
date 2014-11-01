// http://mherman.org/blog/2014/08/14/kickstarting-angular-with-gulp/
var gulp = require('gulp'),
    gutil = require('gutil'),
    browserify = require('gulp-browserify'),
    changed = require('gulp-changed'),
    clean = require('gulp-clean'),
    coffee = require('gulp-coffee'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    jshint = require('gulp-jshint'),
    livereload = require('gulp-livereload'),
    minifyCSS = require('gulp-minify-css'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch');

// tasks
gulp.task('lint', function () {
    gulp.src(['./app/**/*.js', '!./app/components/**'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
});
gulp.task('clean', function () {
    gulp.src('./dist/**/*')
        .pipe(clean({force: true, read: false}));
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
        .pipe(concat('./js/all.js'))
        .pipe(gulp.dest('./dist/'))
});
gulp.task('coffee', function () {
    gulp.src(['./app/**/*.coffee', '!./app/components/**'])
        .pipe(coffee({bare: true}).on('error', gutil.log))
        .pipe(gulp.dest('./app/'))
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
    connect.server({
        root: 'dist/',
        port: 8080
    });
});
gulp.task('server', function () {
    connect.server({
        root: 'app/',
        port: 8000
    });
});
gulp.task('connectDist', ['build'], function () {
    connect.server({
        root: 'dist/',
        port: 8080
    });
});

// build task
gulp.task('build', [
    'lint', 'minify-css', 'coffee', 'minify-js', 'copy-html-files',
    'copy-bower-components'
]);

// default task
gulp.task('default', ['lint', 'connect'], function () {
    gulp.watch('app/**').on('change', function () {
        gulp.start('build');
    });
});

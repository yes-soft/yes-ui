var gulp = require('gulp'),
    fs = require("fs"),
    del = require('del'),
    concat = require('gulp-concat'), rename = require('gulp-rename'),
    uglify = require('gulp-uglify');

var inject = require('gulp-inject');
var annotate = require('gulp-ng-annotate');
var es = require('event-stream');
var path = require('path');

var dist = "./dist/";

gulp.task('clean', function (cb) {
    return del([
        dist
    ], cb);
});

gulp.task('scripts', function () {
    return gulp.src([
        'src/index.js',
        'src/directives/**/*.js'
    ])
        .pipe(concat('yes.ui.js'))
        .pipe(gulp.dest(dist))
        .pipe(uglify())
        .pipe(rename({extname: '.min.js'}))
        .pipe(gulp.dest(dist));
});

gulp.task('dependencies', function () {
    return gulp.src([
        'components/yes-bundle/dist/vendor/bootstrap/js/bootstrap.js',
        'components/yes-bundle/dist/vendor/ui-bootstrap-tpls.js',
        'components/yes-bundle/dist/vendor/toaster/angular-toastr.tpls.js',
        'components/yes-bundle/dist/vendor/angular-ui-grid/ui-grid.js',
        'components/yes-bundle/dist/vendor/tv4.js',
        'components/yes-bundle/dist/vendor/ObjectPath.js',
        'components/yes-bundle/dist/vendor/schema-form.js',
        'components/yes-bundle/dist/vendor/bootstrap-datepicker.js'
    ])
        .pipe(concat('yes.ui.dependencies.js'))
        .pipe(gulp.dest(dist))
        .pipe(uglify())
        .pipe(rename({extname: '.min.js'}))
        .pipe(gulp.dest(dist));
});

gulp.task('default', ['scripts', 'dependencies'],
    function () {
        console.log('done');
    });
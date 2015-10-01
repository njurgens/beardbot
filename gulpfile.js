#!/usr/bin/env node
/*
 * Copyright (c) 2015 Nicholas Jurgens <nicholas2010081@gmail.com>
 */
'use strict';

var babel = require('gulp-babel'),
    debug = require('gulp-debug'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    jasmine = require('gulp-jasmine'),
    path = require('path'),
    plumber = require('gulp-plumber'),
    watch = require('gulp-watch');

/*
 * Gulp tasks
 */
gulp.task('default', ['build', 'test']);

gulp.task('build', function() {
    return gulp.src('src/**/*.js')
        .pipe(plumber(handle_compiler_error))
        .pipe(babel({
            optional: ['runtime']
        }))
        .pipe(debug({title: 'build'}))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', ['build'], function() {
    // when a file changes, re-run all tests
    gulp.watch('dist/**/*.js', ['test']);

    return watch('src/**/*.js', function(vinyl) {
        var dest = path.dirname(vinyl.path.replace(
                path.join(vinyl.cwd, vinyl.base), 'dist'));

        gulp.src(vinyl.path)
            .pipe(plumber(handle_compiler_error))
            .pipe(babel({
                optional: ['runtime']
            }))
            .pipe(debug({title: 'watch'}))
            .pipe(gulp.dest(dest));
    });
});

gulp.task('test', function(cb) {
    return gulp.src('dist/tests/**/*.js')
        .pipe(debug({title: 'test'}))
        .pipe(jasmine());
});

function handle_compiler_error(err) {
    gutil.log(err.plugin, gutil.colors.red(err.name), '\n', err.message,
            '\n\n' + err.codeFrame, '\n');
}

function handle_jasmine_error(err) {
    gutil.log('jasmine', gutil.colors.red(err.name), err.message);
    this.emit('end');
}

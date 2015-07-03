#!/usr/bin/env node
/*
 * Copyright (c) 2015 Nicholas Jurgens <nicholas2010081@gmail.com>
 */
'use strict';

var babel = require('gulp-babel'),
    debug = require('gulp-debug'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    plumber = require('gulp-plumber'),
    watch = require('gulp-watch');

/*
 * Gulp tasks
 */
gulp.task('default', ['build']);

gulp.task('build', function() {
    return gulp.src('src/**/*.js')
        .pipe(plumber(handle_compiler_error))
        .pipe(babel({
            optional: ['runtime']
        }))
        .pipe(debug({title: 'build'}))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
    return gulp.src('src/**/*.js')
        .pipe(plumber(handle_compiler_error))
        .pipe(watch('src/**/*.js'))
        .pipe(babel({
            optional: ['runtime']
        }))
        .pipe(debug({title: 'watch'}))
        .pipe(gulp.dest('dist'));
});

function handle_compiler_error(err) {
    gutil.log(err.plugin, gutil.colors.red(err.name), '\n', err.message,
            '\n\n' + err.codeFrame, '\n');
}

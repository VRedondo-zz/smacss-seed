'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    livereloadPort = 35729;

// Register Express Task
gulp.task('express', function(){
    var express = require('express'),
        app = express();
    app.use(require('connect-livereload')({port: livereloadPort}));
    app.use(express.static(__dirname));
    app.listen(4000, '0.0.0.0');
});

// Register livereload task
var tinylr;
gulp.task('livereload', function(){
    tinylr = require('tiny-lr')();
    tinylr.listen(livereloadPort)
});

function notifyLiveReload(event){
    var fileName = require('path').relative(__dirname, event.path);

    tinylr.changed({
        body: {
            files: [fileName]
        }
    });
}

// Register Sass Task
gulp.task('sass', function(){
    return gulp.src('./src/sass/style.scss')
        .pipe(sass.sync({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(gulp.dest('./includes/css'));
});

// Register watch task
gulp.task('watch', function(){
    gulp.watch('./src/sass/**/*.scss',['sass']);
    gulp.watch('*.html', notifyLiveReload);
    gulp.watch('./includes/css/*.css', notifyLiveReload);
});

// Register deafult task
gulp.task('default', ['sass', 'express', 'livereload', 'watch'], function(){
});


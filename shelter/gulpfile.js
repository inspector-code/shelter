const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

function style() {
    return gulp.src('./pages/**/*.scss')
            .pipe(sass())
            .pipe(gulp.dest('./pages'))
            .pipe(browserSync.stream())
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    })
    gulp.watch('./pages/**/*.scss', style);
    gulp.watch('./pages/**/*.html').on('change', browserSync.reload);
    gulp.watch('./pages/**/*.js').on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watch;
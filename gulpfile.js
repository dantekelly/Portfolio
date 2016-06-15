var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var imagemin = require('gulp-imagemin');
var runSequence = require('run-sequence');
var rename = require('gulp-rename');
var clean = require('gulp-clean');

gulp.task('clean-dist', function () {
    return gulp.src('./styles/dist', {read: false})
        .pipe(clean());
});

gulp.task('imagemin', function () {
    return gulp.src('./media/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./media/dist'));
});

gulp.task('sass', function () {
    return gulp.src('./styles/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./styles'));
});

gulp.task('minify-css', function () {
    return gulp.src('./styles/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./styles/dist'));
});

gulp.task('default', function (done) {
    runSequence('clean-dist', 'sass', 'minify-css', function () {
        console.log('Run something else');
        done();
    });
});
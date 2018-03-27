const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

// Static Server + watching scss/html files
gulp.task('serve', function () {

    browserSync.init({
        server: "public"
    });

    gulp.watch("scss/*.scss", ['sass']);
    gulp.watch("public/*").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function () {
    return gulp.src("scss/styles.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest("./public"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['sass', 'serve']);

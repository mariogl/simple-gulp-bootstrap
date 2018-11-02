const gulp = require('gulp');

// BrowserSync
const browserSync = require('browser-sync').create();

// Plugins CSS
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

// Plugins utilidades
const sourcemaps = require('gulp-sourcemaps');

// Rutas
const dirs = {
    devStyles: {
        src: 'sass',
        dist: 'css'
    }
};

// Inicializar BrowserSync
gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: "."
        },
        open: true,
        injectChanges: true,
        notify: true,
        files: [
            './*.html',
            dirs.devStyles.src + '/**/*.scss'
        ]
    });
});

// compilar sass
gulp.task('dev:styles', function () {
    return gulp.src(dirs.devStyles.src + '/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed',
            precision: 10,
            includePaths: ['.']
        }))
        .on('error', console.error.bind(console))
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dirs.devStyles.dist))
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('watch', ['dev:styles', 'browserSync'], function () {
    gulp.watch(dirs.devStyles.src + '/**/*.scss', ['dev:styles']);
});

gulp.task('default', ['watch'], function (done) {
    done();
});

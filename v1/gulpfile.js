let gulp = require ('gulp'),
    sass = require ('gulp-sass'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    autoPrefix = require('gulp-autoprefixer'),
    htmlMin = require('gulp-htmlmin'),
    cssNano = require('gulp-cssnano'),
    imageMin = require('gulp-imagemin'),
    browserSync = require ('browser-sync').create();

gulp.task('scss', function(){
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./src/css'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('css', function(){
    return gulp.src([
        'node_modules/normalize.css/normalize.css',
        './src/css/**/*.css'])
        .pipe(concat('style.min.css'))
        .pipe(autoPrefix({
            browsers: ['last 5 versions']
        }))
        .pipe(cssNano({
            discardComments : {removeAll :  true }
        }))
        .pipe(gulp.dest('./dst/css/'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('html', function(){
    return gulp.src('./src/*.html')
        .pipe(htmlMin({
            collapseWhitespace: true,
            removeComments: true}))
        .pipe(gulp.dest('./dst/'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('img', function(){
    return gulp.src('./src/img/*')
        .pipe(imageMin())
        .pipe(gulp.dest('./dst/img/'))
});

gulp.task('js', function(){
    return gulp.src('./src/js/*.js')
        .pipe(concat('script.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dst/js/'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./dst/"
        }
    });
});

gulp.task('watch', function(){
    gulp.watch('./src/scss/**/*.scss', gulp.parallel('scss'));
    gulp.watch('./src/css/**/*.css', gulp.parallel('css'));
    gulp.watch('./src/*.html', gulp.parallel('html'));
    gulp.watch('./src/js/*.js', gulp.parallel('js'));
    gulp.watch('./src/img/*', gulp.parallel('img'));
});

gulp.task('default', gulp.parallel('scss', 'css', 'img', 'js','html', 'browser-sync', 'watch'));

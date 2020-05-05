let gulp = require ('gulp'),
    sass = require ('gulp-sass'),
    autoPrefix = require('gulp-autoprefixer'),
    imageMin = require('gulp-imagemin'),
    browserSync = require ('browser-sync').create();

gulp.task('scss', function(){
    return gulp.src(
        './src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoPrefix())
        .pipe(gulp.dest('./src/css/'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('css', function(){
    return gulp.src([
        './src/css/**/*.css'])
        .pipe(gulp.dest('./dst/css/'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('html', function(){
    return gulp.src('./src/*.html')
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
        .pipe(gulp.dest('./dst/js/'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./src/"
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

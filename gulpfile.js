var gulp = require('gulp');
var sass = require('gulp-sass');  //编译scss
var server = require('gulp-webserver');  //起服务
var clean = require('gulp-clean-css'); //压缩css
var concat = require('gulp-concat');  //合并文件
gulp.task('devScss', function () {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(concat('index.css'))
        .pipe(clean())
        .pipe(gulp.dest('./src/css'))
})
gulp.task('devServer', function () {
    return gulp.src('src')
        .pipe(server({
            port: 8080,
            proxies: [
                {
                    source: '/api/get/list', target: 'http://localhost:3000/api/get/list'
                }
            ]
        }))
})
gulp.task('watch',function(){
    return gulp.watch('./src/scss/*.scss',gulp.series('devScss'))
})
gulp.task('dev',gulp.series('devScss','devServer','watch'))
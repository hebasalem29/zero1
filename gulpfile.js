var gulp= require('gulp'),
watch=require('gulp-watch'),
minify=require('gulp-minify'),
concat=require('gulp-concat'),
livereload=require('gulp-livereload'),
sass = require('gulp-sass')(require('sass'));
autoprefixer=require('gulp-autoprefixer'),
pug=require('gulp-pug'),

sorcemaps=require('gulp-sourcemaps');
 
gulp.task('html',function()
{
    return gulp.src('stage/html/*.pug')
    .pipe(pug({pretty:true}))
    .pipe(gulp.dest('dist'))
    .pipe(livereload());
 })
 gulp.task('css',function()
 {
     return gulp.src(['stage/css/**/*.scss','stage/css/**/*.css'])
     .pipe(sorcemaps.init())
     .pipe(sass({outputstyle:'compressed'}))
     .pipe(autoprefixer())
     .pipe(concat('main.css'))
     .pipe(gulp.dest('dist/css'))
     .pipe(livereload());
 })
 gulp.task('js',function()
 {
     return gulp.src('stage/js/*.js')
     .pipe(concat('main.js'))
     .pipe(minify())
     
     .pipe(gulp.dest('dist/js'))
     .pipe(livereload());
 })
gulp.task('watch',function()
{
    livereload.listen();
    gulp.watch('stage/html/**/*.pug',gulp.series('html'));
    gulp.watch(['stage/css/**/*.scss','stage/css/**/*.css'],gulp.series('css'));
    gulp.watch('stage/js/*.js',gulp.series('js'));
})
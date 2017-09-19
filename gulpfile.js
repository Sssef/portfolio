//'Smart-grid' responsive flexbox grid
var smartgrid = require('smart-grid');

/* It's principal settings in smart grid project */
var settings = {
	filename: '_smart-grid',
    outputStyle: 'sass', /* less || scss || sass || styl */
    columns: 12, /* number of grid columns */
    offset: "20px", /* gutter width px || % */
    container: {
        maxWidth: '1280px', /* max-width оn very large screen */
        fields: '10px' /* side fields */
    },
    breakPoints: {
        lg: {
            'width': '1200px', /* -> @media (max-width: 1100px) */
            'fields': '20px' /* side fields */
        },
        md: {
            'width': '992px',
            'fields': '15px'
        },
        sm: {
            'width': '768px',
            'fields': '10px'
        },
        xs: {
            'width': '480px',
            'fields': '0px'
        },
		ns: {
			'width': '320px',
		 	'fields': '0px'
		}
        /*
        We can create any quantity of break points.

        some_name: {
            some_width: 'Npx',
            some_offset: 'N(px|%)'
        }
        */
    }
};

smartgrid('./src/sass', settings);


var gulp = require('gulp'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
 	autoprefixer = require('gulp-autoprefixer'),
 	cleanCSS = require('gulp-clean-css'),
	plumber = require('gulp-plumber'),
	uglify = require('gulp-uglify'),
	del = require('del'),
	gcmq = require('gulp-group-css-media-queries'),
	rename = require('gulp-rename'),
	browserSync = require('browser-sync'),
	imagemin = require('gulp-imagemin'),
	cache = require('gulp-cache'),
	notify = require("gulp-notify");


//Project scripts
gulp.task('common-js', function() {
	return gulp.src([
		'src/js/common.js'
	,])
	.pipe(concat('common.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('src/js'));
});

gulp.task('scripts', ['common-js'], function() {
	return gulp.src([
		'src/libs/jquery/dist/jquery.min.js',
		'src/libs/parallax/jquery.stellar.min.js',
		'src/libs/waypoints/waypoints.min.js',
		'src/libs/scroll2id/PageScroll2id.min.js',
		'src/libs/animate/animate-css.js',
		'src/libs/magnific-popup/jquery.magnific-popup.min.js',
		'src/libs/mixitup/mixitup.min.js',
		'src/libs/jqBootstrapValidation/jqBootstrapValidation.js',
		'src/js/common.min.js', // Always in the end
		])
	.pipe(concat('scripts.min.js'))
	//.pipe(uglify()) //Minimazed all js (optional)
	.pipe(gulp.dest('src/js'))
	.pipe(browserSync.reload({stream: true}));
});


//Sass
gulp.task('sass', function(){
	return gulp.src('src/sass/**/*.sass')
	.pipe(sass({
		outputStyle: 'expand'
	}).on("error", notify.onError()))
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer(['last 5 versions']))
	.pipe(plumber())
	.pipe(gcmq())
	.pipe(cleanCSS())
	.pipe(gulp.dest('src/css'))
	.pipe(browserSync.reload({
		stream: true
	}));
});


//Image compression
gulp.task('imagemin', function() {
	return gulp.src('src/img/**/*')
	.pipe(cache(imagemin()))
	.pipe(gulp.dest('dist/img'));
});


//Project build
gulp.task('build', ['removedist', 'imagemin', 'sass', 'scripts'], function() {
	var buildFiles = gulp.src([
		'src/*.html',
		'src/.htaccess',
		]).pipe(gulp.dest('dist'));

	var buildCss = gulp.src([
		'src/css/main.min.css',
		]).pipe(gulp.dest('dist/css'));

	var buildJs = gulp.src([
		'src/js/scripts.min.js',
		]).pipe(gulp.dest('dist/js'));

	var buildFonts = gulp.src([
		'src/fonts/**/*',
		]).pipe(gulp.dest('dist/fonts'));
});


//Page autoreload
gulp.task('browser-sync', function(){
	browserSync({
		server: {
			baseDir: 'src'
		},
		notyfy: false
	});
});


//Tracking
gulp.task('watch', ['sass', 'scripts', 'browser-sync'], function() {
	gulp.watch('src/sass/**/*.sass', ['sass']);
	gulp.watch(['libs/**/*.js', 'src/js/common.js'], ['scripts']);
	gulp.watch('src/*.html', browserSync.reload);
});


//Clean
gulp.task('removedist', function() { return del.sync('dist'); });
gulp.task('clearcache', function () { return cache.clearAll(); });


//Default task: gulp
gulp.task('default', ['watch']);

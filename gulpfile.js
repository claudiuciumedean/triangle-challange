"use strict";

let config = {
	outputBase: "client/dist/",//has to contain trailing slash

	// if you use the glob syntax, files are concatenated in alphabetical order, to force a specific order, specify a list of files
	cssSource: ['client/src/css/**/*.css', 'client/src/css/components/**/*.css'],
	mainCss: "client/src/css/style.css",
	printCss: "client/src/css/print.css",
	cssOutput: "css/",// with trailing slash; leave empty for direct output in the outputBase (w/o trailing slash)
	cssName: "style.css",

	scriptsSource: ['client/src/scripts/**/*.js'], // for watching
	startScripts: [
		{ name:"client/src/scripts/main.js", browserslist:["IE 11"] }
	], // "main" files from which the bundle is created
	scriptsOutput: "scripts/",// with trailing slash; leave empty for direct output in the outputBase (w/o trailing slash)
	scriptsName: "all.js",

	imgSource: ["src/images/**/*"],
	imgOutput: "images",// with trailing slash; leave empty for direct output in the outputBase (w/o trailing slash)

	viewsSource: ["./index.html"],

	debug: true
};

const gulp = require('gulp');
const gulpif = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const browserSync = require('browser-sync').create();
const plumber = require('gulp-plumber');
const browserify = require("browserify");
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify-es').default;
const source = require('vinyl-source-stream');
const es = require('event-stream');

gulp.task('scripts', function() {
	var tasks = config.startScripts.map(function(entry) {
		return browserify({
			entries: [entry.name],
			debug:config.debug
		})
		.transform('babelify', {
		"presets": [
			[ "env",
				{ 
					"targets": { "browsers": entry.browserslist }
				}
			]
		]
	})
	.bundle()
		.pipe(source(entry.name.substr(entry.name.lastIndexOf("/") + 1)))
		.pipe(buffer())
		.pipe(gulpif(!config.debug, uglify()))
		.pipe(gulp.dest(config.outputBase + config.scriptsOutput))
		.pipe(browserSync.stream());
	});
	return es.merge.apply(null, tasks);
});


gulp.task('css', (cb) => {
	const postcss = require('gulp-postcss');
	const postcssPartialImport = require('postcss-partial-import');		
	const cssVariables = require('postcss-css-variables');
	const cleanCSS = require('gulp-clean-css');
	const autoprefixer = require('autoprefixer');
	const cssMqPacker = require('css-mqpacker');

	gulp.src(config.printCss)
		.pipe(postcss([cssMqPacker(), postcssPartialImport, cssVariables({ preserve: true }), autoprefixer({ browsers: ["> 1%", "Firefox > 3", "ie > 7"] })]))
		.pipe(cleanCSS())
		.pipe(gulp.dest(config.outputBase + config.cssOutput));

	gulp.src(config.mainCss)
		.pipe(gulpif(config.debug, sourcemaps.init()))
		.pipe(plumber())
		.pipe(postcss([cssMqPacker(), postcssPartialImport, cssVariables({ preserve: true }), autoprefixer({ browsers: ["> 1%", "Firefox > 3", "ie > 7"] }) ]) )
		.pipe(cleanCSS())
		.pipe(gulpif(config.debug, sourcemaps.write()))
		.pipe(gulp.dest(config.outputBase + config.cssOutput))
		.pipe(browserSync.stream());
	cb();
});

gulp.task('images', () => {
	gulp.src(config.imgSource)
		.pipe(gulp.dest(config.outputBase + config.imgOutput));
});

gulp.task('views', (cb) => {
	gulp.src(config.viewsSource)
		.pipe(gulp.dest(config.outputBase));
	browserSync.reload();
	cb();
});

gulp.task('clean', () => {
	del.sync([config.outputBase + "**/*"]);
});

gulp.task('browserSync', () => {
	browserSync.init({
		notify: {styles: {top: 'auto', bottom: '0'} },
		proxy: 'localhost:8080'
	});
});

gulp.task('set-production', (cb) => {config.debug = false; cb(); });
gulp.task('set-development', (cb) => {config.debug = true; cb(); });

gulp.task('watch-scripts', () => gulp.watch(config.scriptsSource, ['scripts']));
gulp.task('watch-css', () => gulp.watch(config.cssSource, ['css']));
gulp.task('watch-images', () => gulp.watch(config.imgSource, ['images']));
gulp.task('watch-views', () => gulp.watch(config.viewsSource, ['views']));

gulp.task('build', ['clean', 'set-production', 'scripts', 'css', 'images', 'set-development']); // PRODUCTION
gulp.task('default', ['browserSync', 'scripts', 'views', 'css', 'images', 'watch-scripts', 'watch-css', 'watch-images', 'watch-views']); // DEVELOPMENT
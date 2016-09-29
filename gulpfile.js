var gulp = require('gulp');
var nodeMinify = require('node-minify');

//	Options, constants, enumerations
var monitoredFiles = {
	js: 'js/*.js',
	css: 'assets/css/*.css'
}

var outputFiles = {
	js: 'js/min/site.min.js',
	css: 'assets/css/min/site.min.css'
}

var jsMinifyOptions = {
	type: 'gcc',
	fileIn: monitoredFiles.js,
	fileOut: outputFiles.js,
	callback: function (err, min) { console.log(err); }
};

var cssMinifyOptions = {
	type: 'yui-css',
	fileIn: monitoredFiles.css,
	fileOut: outputFiles.css,
	callback: function (err, min) { console.log(err); }
}

//	Minifies JS files
gulp.task('minifyJS', function () {
	new nodeMinify.minify(jsMinifyOptions);
	console.log('Minified JS complete.');
});

//	Minifies CSS files
gulp.task('minifyCSS', function () {
	new nodeMinify.minify(cssMinifyOptions);
	console.log('Minified CSS complete.');
});

//	Watches JS files for updates
gulp.task('watchJsFiles', function () {
	gulp.watch(monitoredFiles.js, ['minifyJS'], function (event) {
		console.log(event.path + ' was ' + event.type);
	});
});

//	Watches CSS files for updates
gulp.task('watchCssFiles', function () {
	gulp.watch(monitoredFiles.css, ['minifyCSS'], function (event) {
		console.log(event.path + ' was ' + event.type);
	});
});

//	Runs the default task
gulp.task('default', ['minifyJS', 'minifyCSS', 'watchJsFiles', 'watchCssFiles'], function () {
	console.log("Default task run.");
});
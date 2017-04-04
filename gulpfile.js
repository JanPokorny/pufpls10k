var gulp = require("gulp");
var mustache = require('gulp-mustache');
var htmlmin = require('gulp-htmlmin');

var vars = {
	foreground: "#222",
	background: "#EEE",
	logocolor: "#600",
	canvascolor: "#555"
};

gulp.task('default', function() {
	return gulp.src(["./src/index.html"])
		.pipe(mustache(vars))
		.pipe(htmlmin({
			collapseWhitespace: true,
			removeComments: true,
			minifyCSS: true,
			minifyJS: true
		}))
		.pipe(gulp.dest("./dist"));
});
var gulp = require("gulp"),
    del = require("del"),
    wait = require('gulp-wait'),
    browserify = require("browserify"),
    source = require("vinyl-source-stream"),
    buffer = require("vinyl-buffer"),
    tslint = require("gulp-tslint"),
    tsc = require("gulp-typescript"),
    sourcemaps = require("gulp-sourcemaps"),
    uglify = require("gulp-uglify"),
    runSequence = require("run-sequence"),
    mocha = require("gulp-mocha"),
    istanbul = require("gulp-istanbul"),
    browserSync = require('browser-sync').create();

gulp.task("lint", function () {
    return gulp.src([
        "src/**/**.ts"
    ])
        .pipe(tslint({}))
        .pipe(tslint.report("verbose"));
});

gulp.task('clean', function () {
    return del([
      'generated/**/*'
    ]);
  });

var tsProject = tsc.createProject("tsconfig.json");

gulp.task("build", function () {
    return gulp.src([
        "src/**/**.ts",
        "typings/main.d.ts/",
        "src/interface/interfaces.d.ts"
    ])
        .pipe(tsProject())
        .js.pipe(gulp.dest("generated/"));
});

gulp.task("bundle", function () {

    var libraryName = "hejare-spegel";
    var mainTsFilePath = "generated/main.js";
    var outputFolder = "public/src/";
    var outputFileName = libraryName + ".min.js";

    var bundler = browserify({
        debug: true,
        standalone: libraryName
    });

    return bundler.add(mainTsFilePath)
        .bundle()
        .pipe(source(outputFileName))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        // .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(outputFolder));
});

gulp.task("watch", ["default"], function () {

    browserSync.init({
        server: {
            baseDir: "./public/"
        }
    });

    gulp.watch(["src/**/**.ts", "test/**/*.ts"], ["default"]);
    gulp.watch(["generated/**/*"], ["bundle"]);
    gulp.watch(["public/src/*.js", "public/**/*.html"]).on('change', browserSync.reload);
});

gulp.task("default", ["clean", "build"]);

gulp.task("publish", ["clean", "build", "bundle"]);
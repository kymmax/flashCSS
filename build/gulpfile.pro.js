const gulp = require('gulp'),
    concat = require('gulp-concat'), //合併檔案
    cleanCSS = require('gulp-clean-css'), //壓縮css
    terser = require('gulp-terser'), //壓縮js
    babel = require('gulp-babel'), //轉換ES6
    sass = require('gulp-sass'), //sass轉換
    include = require('gulp-file-include'), //合併檔案
    autoprefixer = require('gulp-autoprefixer'), //prefix
    rev = require('gulp-rev'), // 版本號相關插件
    revCollector = require('gulp-rev-collector'), // 版本號相關插件
    Config = require('./gulpfile.config.js'),
    cssImport = require('gulp-cssimport'),
    clean = require('gulp-clean'),
    php = require('gulp-connect-php'),
    purgecss = require('gulp-purgecss');
sass.compiler = require('node-sass');
// ver1.0

function pro() {
    function runClean() {
        return gulp.src('dist/', { read: false, allowEmpty: true })
            .pipe(clean());
    }

    function runHTML() {
        return gulp.src(Config.html.src)
            .pipe(include({ prefix: '@@', basepath: '@file' }))
            // .pipe(revCollector({ replaceReved: true }))
            .pipe(gulp.dest(Config.html.dist))
    }

    function runASPX() {
        return gulp.src(Config.aspx.src)
            .pipe(gulp.dest(Config.aspx.dist))
    }

    function runPhp() {
        return gulp.src(Config.php.src)
            // .pipe(revCollector({ replaceReved: true }))
            .pipe(gulp.dest(Config.php.dist))
    }

    function runImage() {
        return gulp.src(Config.img.src)
            // .pipe(rev())
            // .pipe(gulp.dest(Config.img.dist))
            // .pipe(rev.manifest())
            // .pipe(gulp.dest(Config.img.rev));
    }

    function runCss() {
        return gulp.src(Config.css.src)
            .pipe(autoprefixer())
            .pipe(cssImport())
            .pipe(cleanCSS())
            .pipe(rev())
            .pipe(gulp.dest(Config.css.dist))
            .pipe(rev.manifest())
            .pipe(gulp.dest(Config.css.dist));
    }

    function runSass() {
        return gulp.src(Config.sass.ary)
            // .pipe(revCollector({ replaceReved: true }))
            .pipe(sass().on('error', sass.logError))
            .pipe(cssImport())
            .pipe(cleanCSS())// tiny
            .pipe(autoprefixer({ overrideBrowserslist: ['IE 6', 'Chrome 9', 'Firefox 14'] }))
            // .pipe(rev())
            .pipe(gulp.dest(Config.sass.dist))
            // .pipe(rev.manifest())
            // .pipe(gulp.dest(Config.sass.rev));
    }

    function purgeCSS() {
        return gulp.src(Config.sass.dist + '/*.css')
            .pipe(purgecss({
                content: [Config.html.dist + '**/*.html']
            }))
            .pipe(gulp.dest(Config.sass.dist))
    }

    function runJsMerge() {
        return gulp.src(Config.js.ary)
            // .pipe(revCollector({ replaceReved: true }))
            .pipe(include({ prefix: '@@', basepath: '@file' }))
            // .pipe(babel({"presets": [["@babel/preset-env",{"modules": false}]]}))
            .pipe(terser({
                compress: {
                    drop_console: true,
                    toplevel: true
                },
                mangle: {
                    toplevel: true,
                },
            }))
            // .pipe(rev())
            .pipe(gulp.dest(Config.js.dist))
            // .pipe(rev.manifest())
            // .pipe(gulp.dest(Config.js.rev));
    }
    function runLib() {
        return gulp.src(Config.lib.src)
            .pipe(gulp.dest(Config.lib.dist));
    }

    function runScripts() {
        return gulp.src(Config.scripts.src)
            .pipe(terser())
            .pipe(gulp.dest(Config.scripts.dist));
    }


    gulp.task('pro', gulp.series(runClean, runImage, runSass, runJsMerge, runHTML, runPhp, purgeCSS), function (done) {
        done();
    })
}

module.exports = pro;
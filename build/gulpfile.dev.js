const gulp = require('gulp'),
    concat = require('gulp-concat'), //合併檔案
    cleanCSS = require('gulp-clean-css'), //壓縮css
    //uglify = require('gulp-uglify'), //壓縮js
    terser = require('gulp-terser'), //壓縮js
    rename = require('gulp-rename'), //重新命名檔案
    // imagemin = require('gulp-imagemin'), //壓縮圖片
    babel = require('gulp-babel'), //轉換ES6
    sass = require('gulp-sass'), //sass轉換
    include = require('gulp-file-include'), //合併檔案
    autoprefixer = require('gulp-autoprefixer'), //prefix
    // del = require('del'),
    runSequence = require('run-sequence'), // 版本號相關插件
    rev = require('gulp-rev'), // 版本號相關插件
    revCollector = require('gulp-rev-collector'), // 版本號相關插件
    Config = require('./gulpfile.config.js'),
    browserSync = require('browser-sync').create(),
    cssImport = require('gulp-cssimport'),
    clean = require('gulp-clean'),
    php = require('gulp-connect-php'),
    purgecss = require('gulp-purgecss');
sass.compiler = require('node-sass');

function dev() {
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

    function runPhp() {
        return gulp.src(Config.php.src)
            .pipe(gulp.dest(Config.php.dist))

    }

    function runImage() {
        return gulp.src(Config.img.src)
            // .pipe(rev())
            .pipe(gulp.dest(Config.img.dist))
            .pipe(rev.manifest())
            // .pipe(gulp.dest(Config.img.rev));
    }

    function runCss() {
        return gulp.src(Config.css.src)
            .pipe(autoprefixer())
            .pipe(cssImport())
            .pipe(gulp.dest(Config.css.dist));
    }

    function runSass() {
        return gulp.src(Config.sass.ary)
            // .pipe(revCollector({ replaceReved: true }))
            .pipe(sass().on('error', sass.logError))
            .pipe(cssImport())
            //.pipe(cleanCSS())// tiny
            .pipe(autoprefixer({ overrideBrowserslist: ['IE 6', 'Chrome 9', 'Firefox 14'] }))
            // .pipe(rev())
            .pipe(gulp.dest(Config.sass.dist))
            // .pipe(rev.manifest())
            // .pipe(gulp.dest(Config.sass.rev));
    }

    function runJsMerge() {
        return gulp.src(Config.js.ary)
            // .pipe(revCollector({ replaceReved: true }))
            .pipe(include({ prefix: '@@', basepath: '@file' }))
            // .pipe(babel({
            //     "presets": [["@babel/preset-env",{"modules": false}]]
            // }))
            //.pipe(terser())
            // .pipe(rev())
            .pipe(gulp.dest(Config.js.dist))
            // .pipe(rev.manifest())
            // .pipe(gulp.dest(Config.js.rev));
    }
    function runLib() {
        return gulp.src(Config.lib.src)
            .pipe(gulp.dest(Config.lib.dist));
    }

    // function runScripts() {
    //     return gulp.src(Config.scripts.src)
    //         // .pipe(bable())
    //         .pipe(include({ prefix: '@@', basepath: '@file' }))
    //         .pipe(gulp.dest(Config.scripts.dist))
    // }


    function runWebserver() {
        php.server({
            port: 8010,
            keepalive: true,
            base: './dist/'
        },
            function () {
                browserSync.init({
                    server: {
                        baseDir: './dist/',
                    },
                    port: 8010,
                    //   reloadDelay: 2000,
                    // baseDir: "./dist/",
                    // proxy: "localhost:8010",
                    // open: true,
                    // notify: false,
                    https: true
                });
            });
    }

    function runReload(done) {
        browserSync.reload();
        done();
    }

    function watch() {
        // gulp.watch(Config.src, gulp.series(del));
        gulp.watch(Config.lib.src, gulp.series(runLib, runReload));
        gulp.watch(Config.sass.src, gulp.series(runSass, runReload));
        gulp.watch(Config.js.src, gulp.series(runJsMerge, runReload));
        gulp.watch(Config.html.src, gulp.series(runHTML, runReload));
        gulp.watch(Config.php.src, gulp.series(runPhp, runReload));
        gulp.watch(Config.img.src, gulp.series(runImage, runReload));
        // gulp.watch(Config.aspx.src, gulp.series(runASPX, runReload));
        // gulp.watch(path.source + 'icons/*.svg', ['iconfonts']);
    }

    gulp.task('dev', gulp.series(runImage, runSass, runJsMerge, runLib, runPhp, runHTML, gulp.parallel(watch, runWebserver)), function (done) {
        done();
    })


    // var path = {
    //     source: './source/',
    //     public: './public/'
    //   }

    // gulp.dev('iconfonts', function (end) {
    //     var iconStream = gulp.src([path.source + 'icons/*.svg'])    // 載入 svg
    //         .pipe(iconfont({ fontName: 'icon' }));                    // 定義 fontName

    //     async.parallel([
    //         function handleGlyphs(cb) {
    //             iconStream.on('glyphs', function (glyphs, options) {
    //                 gulp.src(path.source + 'css_template/iconfonts.css')  // 取用要輸出的 CSS 樣板
    //                     .pipe(consolidate('lodash', {
    //                         glyphs: glyphs,
    //                         fontName: 'icon',
    //                         fontPath: '../fonts/',                            // CSS 對應的字體路徑
    //                         className: 'all-my-class'                         // CSS Class 的前輟詞
    //                     }))
    //                     .pipe(gulp.dest(path.public + 'stylesheets'))       // CSS 輸出資料夾
    //                     .on('finish', cb);
    //             });
    //         },
    //         function handleFonts(cb) {
    //             iconStream
    //                 .pipe(gulp.dest(path.public + 'fonts/'))              // 字體輸出資料夾
    //                 .on('finish', cb);
    //         }
    //     ], end);
    // });

}

module.exports = dev;
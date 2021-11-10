var SRC_DIR = './src/assets/';     // 源文件目录  
var DIST_DIR = './dist/assets/';   // 文件处理后存放的目录  
var DIST_FILES = DIST_DIR + '**'; // 目标路径下的所有文件  
var VER_HASH_JSON = SRC_DIR + 'rev/**/*.json';

var Config = {
    src: SRC_DIR,
    dist: DIST_DIR,
    dist_files: DIST_FILES,
    php: {
        dir: './src/',
        src: './src/' + '*.php',  
        dist: './dist/' 
    },
    html: {  
        dir: './src/',
        src: [VER_HASH_JSON,'./src/' + '**/*.html'],  
        dist: './dist/'  
    },  
    // assets: {  
    //     dir: SRC_DIR + 'assets',
    //     src: SRC_DIR + 'assets/**/*',            // assets目录：./src/assets  
    //     dist: DIST_DIR + 'assets'                // assets文件build后存放的目录：./dist/assets  
    // },  
    css: {  
        dir: SRC_DIR + 'css',
        src: SRC_DIR + 'css/**/*.css',           // CSS目录：./src/css/  
        dist: DIST_DIR + 'css'                   // CSS文件build后存放的目录：./dist/css  
    },  
    sass: {  
        rev: SRC_DIR + 'rev/css/',
        ary: [VER_HASH_JSON,SRC_DIR + 'sass/**/*.{sass,scss}'],
        dir: SRC_DIR + 'sass',
        src: SRC_DIR + 'sass/**/*.{sass,scss}',  // SASS目录：./src/sass/  
        dist: DIST_DIR + 'css'                   // SASS文件生成CSS后存放的目录：./dist/css  
    },  
    js: {
        rev: SRC_DIR + 'rev/js/',
        ary: [VER_HASH_JSON,SRC_DIR + 'js/**/*.js'],
        dir: SRC_DIR + 'js',
        src: SRC_DIR + 'js/**/*.js',             // JS目录：./src/js/  
        dist: DIST_DIR + 'js',                   // JS文件build后存放的目录：./dist/js  
        build_name: 'main.js'                    // 合并后的js的文件名  
    },
    scripts: {  dir: SRC_DIR + 'scripts',
        src: SRC_DIR + 'scripts/**/*.js',
        dist: DIST_DIR + 'scripts'            
    },
    img: {  
        rev: SRC_DIR + 'rev/img/',
        dir: SRC_DIR + 'images',
        src: SRC_DIR + 'images/**/*',            // images目录：./src/images/  
        dist: DIST_DIR + 'images'                // images文件build后存放的目录：./dist/images  
    },
    lib:{
        dir: SRC_DIR,
        src: [SRC_DIR + 'vendor/**/*', SRC_DIR + 'vendor/js/**', SRC_DIR + 'vendor/sass/**'],//執行compaile品牌所有引入文件（此區資料夾不可更動）
        dist: DIST_DIR + 'vendor',
    }
};

module.exports = Config;
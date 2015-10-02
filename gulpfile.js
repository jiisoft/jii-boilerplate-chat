require('gulp-easy')(require('gulp'))
    .js('client/index.js', 'main.js')
    .less('client/index.less', 'main.css')
    .files('node_modules/bootstrap/fonts/*', 'public/fonts/')
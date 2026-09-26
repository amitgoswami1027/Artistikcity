const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | ArtistikCity front-end build (React + Inertia.js)
 |--------------------------------------------------------------------------
 | Laravel Mix is a stand-alone webpack wrapper (no PHP required). The bundle is
 | written straight into the Spring Boot static folder, which is served at "/":
 |     ../src/main/resources/static/js/app.js   and   /css/app.css
 |
 |   npm install
 |   npm run dev        (development build)
 |   npm run watch      (rebuild on change)
 |   npm run prod       (minified production build)
 */
mix.setPublicPath('../src/main/resources/static');

mix.js('resources/js/app.js', 'js')
    .react()
    .postCss('resources/css/app.css', 'css', [
        require('postcss-import'),
        require('tailwindcss'),
        require('autoprefixer'),
    ])
    .webpackConfig(require('./webpack.config'));

// the Spring templates reference /js/app.js directly, so no mix-manifest versioning is used
mix.options({ manifest: false });

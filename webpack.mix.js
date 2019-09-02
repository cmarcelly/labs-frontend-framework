let config = require('./config.js');
let mix = require('laravel-mix');
let tailwindcss = require('laravel-mix-tailwind');
let purgecss = require('laravel-mix-purgecss');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let FaviconsWebpackPlugin = require('favicons-webpack-plugin');
let glob = require('glob-all');
const path = require('path');
const fs = require('fs');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */

const PATHS = {
    src: config.srcDirectory,
    dist: config.distDirectory
}

function generateHtmlPlugins (templateDir) {
    const templateFiles = fs.readdirSync(path.resolve(__dirname, '.'+templateDir))
    return templateFiles.map(item => {
      const parts = item.split('.')
      const name = parts[0]
      const extension = parts[1]
      return new HtmlWebpackPlugin({
        filename: `${name}.html`,
        template: 'ejs-compiled-loader!'+__dirname + `${templateDir}/${name}.${extension}`,
        hash: true,
        title: config.title,
        description: config.description,
        keywords: config.keywords,
        og_type: config.og_type,
        og_title: config.og_title,
        og_description: config.og_description,
        og_image: config.og_image,
        og_url: config.og_url,
        og_siteName: config.og_siteName,
      })
    })
}
const htmlPlugins = generateHtmlPlugins(`/${PATHS.src}/templates/views`);

// Handle list of directories assets, if doesn't exists, creates it
let assetsDirectories = [];
config.assetsDirectories.forEach(element => {
    assetsDirectories.push(`${PATHS.src}/` + element);
    try {
        fs.statSync(`${PATHS.src}/` + element);
    } catch(e) {
        fs.mkdirSync(`${PATHS.src}/` + element);
    }

    // Copy assets to dist directories
    mix.copy(`${PATHS.src}/`+element+`/`, `${PATHS.dist}/`+element+`/`);
});

mix
    .js(`${PATHS.src}/scripts/app.js`, `${PATHS.dist}/js/`)
    .sass(`${PATHS.src}/styles/app.scss`, `${PATHS.dist}/css/`)
    .tailwind()
    .options({
        processCssUrls: false
    })
    .webpackConfig({
        output: {
            publicPath: '',
        },
        plugins: [
            new FaviconsWebpackPlugin({
                logo: `./${PATHS.src}/favicon.jpg`,
                title: config.title,
                prefix: 'favicons/',
            })
        ]
        .concat(htmlPlugins),
    })
    .purgeCss({
        folders: [`${PATHS.src}/templates/views/`, `${PATHS.src}/templates/partials/`],
        extensions: ['ejs']
    })
    .browserSync({
        proxy: (config.proxy.length <= 0) ? false : config.proxy,
        server: (config.proxy.length <= 0) ? `./${PATHS.dist}` : false,
        ghostMode: false,
        files: [
            `${PATHS.dist}/css/{*,**/*}.css`,
            `${PATHS.dist}/js/{*,**/*}.js`,
            '{*,**/*}.ejs'
        ]
    })
    .disableNotifications()
    .setPublicPath(PATHS.dist);

if (!mix.inProduction()) {
    mix.sourceMaps()
    .webpackConfig({
        devtool: 'inline-source-map'
    });
}

// Disable mix-manifest.json
Mix.manifest.refresh = _ => void 0

// Full API
// mix.js(src, output);
// mix.react(src, output); <-- Identical to mix.js(), but registers React Babel compilation.
// mix.preact(src, output); <-- Identical to mix.js(), but registers Preact compilation.
// mix.coffee(src, output); <-- Identical to mix.js(), but registers CoffeeScript compilation.
// mix.ts(src, output); <-- TypeScript support. Requires tsconfig.json to exist in the same folder as webpack.mix.js
// mix.extract(vendorLibs);
// mix.sass(src, output);
// mix.standaloneSass('src', output); <-- Faster, but isolated from Webpack.
// mix.fastSass('src', output); <-- Alias for mix.standaloneSass().
// mix.less(src, output);
// mix.stylus(src, output);
// mix.postCss(src, output, [require('postcss-some-plugin')()]);
// mix.browserSync('my-site.test');
// mix.combine(files, destination);
// mix.babel(files, destination); <-- Identical to mix.combine(), but also includes Babel compilation.
// mix.copy(from, to);
// mix.copyDirectory(fromDir, toDir);
// mix.minify(file);
// mix.sourceMaps(); // Enable sourcemaps
// mix.version(); // Enable versioning.
// mix.disableNotifications();
// mix.setPublicPath('path/to/public');
// mix.setResourceRoot('prefix/for/resource/locators');
// mix.autoload({}); <-- Will be passed to Webpack's ProvidePlugin.
// mix.webpackConfig({}); <-- Override webpack.config.js, without editing the file directly.
// mix.babelConfig({}); <-- Merge extra Babel configuration (plugins, etc.) with Mix's default.
// mix.then(function () {}) <-- Will be triggered each time Webpack finishes building.
// mix.extend(name, handler) <-- Extend Mix's API with your own components.
// mix.options({
//   extractVueStyles: false, // Extract .vue component styling to file, rather than inline.
//   globalVueStyles: file, // Variables file to be imported in every component.
//   processCssUrls: true, // Process/optimize relative stylesheet url()'s. Set to false, if you don't want them touched.
//   purifyCss: false, // Remove unused CSS selectors.
//   uglify: {}, // Uglify-specific options. https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
//   postCss: [] // Post-CSS options: https://github.com/postcss/postcss/blob/master/docs/plugins.md
// });

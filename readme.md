Introduction
============

👋 Welcome! This project is a static site builder based on Webpack and
Laravel Mix.
 You will find here all you need to build a solid static page or a full
website using modern frontend tools.

Installation
------------

Download the repository and install dependencies with this command in
the terminal:
`yarn`

Build commands
--------------

Using Browsersync with HMR:
`yarn watch`

Development build:
`yarn dev`

Production build:
`yarn production`

What's included?
----------------

1.  **Javascript**
    -   ES2017 + modules compilation.
    -   Build and compile .vue components (via vue-loader).
    -   Tree-shaking, new in webpack 2 (removes unused library code).
    -   Automatic versioning (query string hash), via mix.version() in
        production.

2.  **CSS Preprocessors**
    -   Compile your SASS while applying automatic CSS3 prefixing.
    -   Basic SCSS Scaffolding included.

3.  **Source maps**
    -   Inlined Source maps in development mode.

4.  **Browsersync**
    -   Time-saving synchronised browser testing.
    -   If you use a **proxy** like `mywebsite.local`, fill the proxy key with 
        it in **config.js**, else leave it blank if you only need to serve static HTML files.

5.  **Tailwind CSS**
    -   Utility-first CSS framework for rapidly building custom user
        interfaces.
    -   [Documentation](https://tailwindcss.com/docs/what-is-tailwind)
    -   [Interactive cheat
        sheet](https://nerdcave.com/tailwind-cheat-sheet)
    -   [Tailwind Grids Generator](https://tailwindgrids.com)

6.  **PurgeCSS**
    -   Analyzes your content and your css files. It removes unused
        selectors from your css, resulting in smaller css files.
    -   [Documentation](https://www.purgecss.com/)

7.  **Basic SCSS Scaffolding**
8.  **Vue.js**
    -   Progressive framework for building user interfaces.
    -   [Documentation](https://vuejs.org/v2/guide/)

9.  **HTMLWebpackPlugin**
    -   Simplifies creation of HTML files to serve your webpack bundles.
    -   [Documentation](https://github.com/jantimon/html-webpack-plugin)

10.  **FaviconsWebpackPlugin**
    -   Generates all your favicons and icons for you.
    -   You'll need to **put a favicon.jpg file in high resolution at your source folder root**
    -   [Documentation](https://github.com/jantimon/favicons-webpack-plugin)

11. **EJS (Embedded JavaScript templating)**
    -   HTML templating engine with partials, variables, loops, etc...
        Parse src/templates/views folder.
    -   [Documentation](https://ejs.co)

12. **Assets Versioning**
    -   Using hash for injected assets (CSS & JS) on production mode
        with HtmlWebpackPlugin.

13. **Assets folders to copy**
    -   In **config.js**, just put the directories' names you'll need to be copied in **dist directory**, for example `assetsDirectories: ['images', 'fonts']`.



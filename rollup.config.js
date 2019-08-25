import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import autoPreprocess from 'svelte-preprocess';
import { scss, globalStyle } from 'svelte-preprocess';
import css from 'rollup-plugin-css-porter';
const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/main.js',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'public/bundle.js'
  },
  plugins: [
    css({
      raw: 'public/module.css',
      minified: 'public/module.min.css'
    }),
    svelte({
      // enable run-time checks when not in production
      dev: !production,
      // include: ['main.scss'],
      // we'll extract any component CSS out into
      // a separate file — better for performance
      // generate: 'spa',
      css: css => {
        // console.log(css); // the concatenated CSS
        // console.log(css.code); // the concatenated CSS
        // console.log(css.map);
        css.write('public/bundle.css');
      },
      preprocess: autoPreprocess([scss(), globalStyle()])
      // preprocess: [
      //   // pug({ /* pug options */ }),
      //   scss({
      //     /* scss options */
      //   })
      //   // coffeescript({ /* coffeescript options */ })
      // ]
    }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration —
    // consult the documentation for details:
    // https://github.com/rollup/rollup-plugin-commonjs
    resolve({
      browser: true,
      dedupe: importee => importee === 'svelte' || importee.startsWith('svelte/')
    }),
    commonjs(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload('public'),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser()
  ],
  watch: {
    clearScreen: false
  }
};

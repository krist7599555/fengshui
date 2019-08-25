// svelte.config.js
const autoPreprocess = require('svelte-preprocess');

module.exports = {
  preprocess: autoPreprocess([scss(), globalStyle()])
};

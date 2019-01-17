'use strict';

const { resolve } = require('path');

const rootDir = resolve(__dirname, '../');
const src = resolve(rootDir, 'src');
const dist = resolve(rootDir, 'docs');
const examples = resolve(rootDir, 'examples');

module.exports = {
  rootDir,
  src,
  dist,
  yamlPath: resolve(src, '**', '*.yml'),

  // watchDir MUST be a directory name.
  // chokidar doesn't emit 'unlinkDir' event when passed a glob pattern
  // https://github.com/paulmillr/chokidar/issues/337
  watchDir: [src, examples],

  examplesDir: resolve(rootDir, 'examples')
};

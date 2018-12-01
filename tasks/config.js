'use strict';

const { resolve } = require('path');

const rootDir = resolve(__dirname, '../');
const src = resolve(rootDir, 'src');
const dist = resolve(rootDir, 'dist');

module.exports = {
  rootDir,
  src,
  dist,
  yamlPath: resolve(src, 'schemas', '**', '*.yml'),

  // watchDir MUST be a directory name.
  // chokidar doesn't emit 'unlinkDir' event when passed a glob pattern
  // https://github.com/paulmillr/chokidar/issues/337
  watchDir: resolve(src, 'schemas'),

  examplesDir: resolve(rootDir, 'examples')
};

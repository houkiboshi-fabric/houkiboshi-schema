'use strict';

const { parse, format, relative } = require('path');

const chokidar = require('chokidar');
const del = require('del');
const consola = require('consola');

const { rootDir, src, dist, watchDir } = require('./config.js');
const { buildAll } = require('./lib/build.js');
const validateAll = require('./lib/validate.js');

const onReady = () => {
  consola.info('Waiting for file changes...');
};
const onError = err => consola.error(`Watcher error: ${err}`);
const onAdd = path => {
  consola.info(`Added file: ${relative(rootDir, path)}`);
  const errors = validateAll();
  if (errors.length > 0) {
    return;
  }
  buildAll();
};
const onChange = path => {
  consola.info(`Changed file: ${relative(rootDir, path)}`);
  const errors = validateAll();
  if (errors.length > 0) {
    return;
  }
  buildAll();
};
const onUnlink = path => {
  consola.info(`Removed file: ${relative(rootDir, path)}`);
  const parsedSrcPath = parse(path);
  const distPath = format({
    dir: parsedSrcPath.dir.replace(src, dist),
    name: parsedSrcPath.name,
    ext: '.json'
  });
  del.sync([distPath]);
  consola.info(`Removed file: ${relative(rootDir, distPath)}`);
  buildAll();
};
const onUnlinkDir = path => {
  consola.info(`Removed directory: ${relative(rootDir, path)}`);
  const parsedSrcPath = parse(path);
  const distPath = format({
    dir: parsedSrcPath.dir.replace(src, dist),
    base: parsedSrcPath.base
  });
  del.sync([distPath]);
  consola.info(`Removed directory: ${relative(rootDir, distPath)}`);
  buildAll();
};

buildAll();

const watcher = chokidar.watch(watchDir);
watcher
  .on('ready', onReady)
  .on('error', onError)
  .on('add', onAdd)
  .on('change', onChange)
  .on('unlink', onUnlink)
  .on('unlinkDir', onUnlinkDir);

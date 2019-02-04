'use strict';

const glob = require('glob');
const { mkdirSync, readFileSync, writeFileSync } = require('fs');
const { basename, format, parse, relative, resolve } = require('path');

const $RefParser = require('json-schema-ref-parser');
const consola = require('consola');
const jsYaml = require('js-yaml');

const clean = require('./clean.js');
const { src, dist, rootDir, yamlPath } = require('../config.js');

const dereference = (schema, options) => {
  let savedError;
  let savedResult;
  let done = false;
  $RefParser.dereference(schema, options, (err, result) => {
    savedError = err;
    savedResult = result;
    done = true;
  });
  require('deasync').loopWhile(() => !done);
  if (savedError) {
    consola.error(schema['$id']);
    throw new Error(savedError);
  }
  return savedResult;
};

const loadYaml = yamlPath => {
  consola.info('Reading:', relative(rootDir, yamlPath));
  const yaml = readFileSync(yamlPath, 'utf-8');
  return jsYaml.safeLoad(yaml);
};

const writeFile = (distPath, data) => {
  try {
    mkdirSync(parse(distPath).dir, { recursive: true });
  } catch (err) {
    consola.error(err);
  }
  writeFileSync(distPath, data);
  consola.success('Export:', relative(rootDir, distPath));
};

const srcPathToDist = yamlPath => {
  const { dir, name } = parse(yamlPath);
  return format({
    dir: dir.replace(src, dist),
    name,
    ext: '.json'
  });
};

const buildSchema = ({ yamlPath, data }) => {
  const json = JSON.stringify(data, null, 2);
  const distPath = srcPathToDist(yamlPath);
  writeFile(distPath, json);
};

const buildSchemaRefParsed = ({ yamlPath }) => {
  const { dir, name } = parse(yamlPath);
  const jsonPath = srcPathToDist(yamlPath);
  const refParsedData = dereference(jsonPath);
  const refParsedDistPath = format({
    dir: resolve(dir.replace(src, dist), 'ref-parsed'),
    name,
    ext: '.json'
  });
  writeFile(refParsedDistPath, JSON.stringify(refParsedData, null, 2));
};

const buildIndex = () => {
  const files = glob.sync(resolve(dist, 'ref-parsed', '*.json'));
  const content = files.map(filePath => {
    const value = JSON.parse(readFileSync(filePath));
    return {
      id: value['$id'],
      value
    };
  });
  const distPath = resolve(dist, 'ref-parsed', 'index.json');
  writeFileSync(distPath, JSON.stringify(content, null, 2));
};

const buildAll = () => {
  clean();
  const schemas = glob.sync(yamlPath).map(p => {
    return {
      data: loadYaml(p),
      yamlPath: p
    };
  });
  schemas.forEach(buildSchema);
  schemas.forEach(buildSchemaRefParsed);
  buildIndex();
};

module.exports = {
  buildAll
};

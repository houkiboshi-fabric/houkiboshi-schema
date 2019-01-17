'use strict';

const { readFileSync } = require('fs');
const { parse, format, resolve, relative } = require('path');

const Ajv = require('ajv');
const consola = require('consola');
const glob = require('glob');

const { rootDir, dist, examplesDir } = require('../config.js');

const readJson = path => {
  const data = readFileSync(path, 'utf-8');
  return JSON.parse(data);
};

// Exclude ref-parsed json from validation targets
const schemaPattern = resolve(dist, '*.json');

const createAjv = () => {
  const schemas = glob.sync(schemaPattern).map(readJson);
  return new Ajv({
    schemas,
    allErrors: true,
    logger: consola,
    validateSchema: true,
    meta: require('ajv/lib/refs/json-schema-draft-06.json')
  });
};

const validate = (data, ajv, schemaId, path) => {
  const validation = ajv.getSchema(schemaId);
  const isValid = validation(data);

  if (!isValid) {
    consola.error(path, validation.errors);
    return validation.errors;
  }

  consola.success('Valid.', path);
  return null;
};

const validateAll = () => {
  const ajv = createAjv();
  const pattern = resolve(examplesDir, '**', '*.json');
  const examplePaths = glob.sync(pattern);
  const examples = examplePaths.map(readJson);
  return examples
    .map((example, i) => {
      const examplePath = examplePaths[i];
      const schemaId = parse(examplePath).base;
      return validate(example, ajv, schemaId, relative(rootDir, examplePath));
    })
    .filter(e => e);
};

module.exports = validateAll;

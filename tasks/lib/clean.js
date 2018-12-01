'use strict';

const {resolve} = require('path');

const del = require('del');

const { dist } = require('../config.js');

const clean = () => {
  const distFilePattern = resolve(dist, '**');
  del.sync([distFilePattern, `!${dist}`]);
};

module.exports = clean;

#!/usr/bin/env node

require('babel-core/register');
require('babel-polyfill');

require('./eslint').default();

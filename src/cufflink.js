#!/usr/bin/env node
process.env.FORCE_COLOR = true;

const program = require('commander');
const package = require('../package.json');

/**
 * CLI Commands
 *
 */
program
    .version((package.name) + '@' + (package.version));

/**
 * Command for creating and seeding
 */
program
    .command('create [dataObject]', 'Generate seed data').alias('c')


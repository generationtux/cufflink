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
    .command('teardown', 'Destroy your seeded object with your drivers used').alias('t')
    .command('drivers', 'List drivers cufflink can currently read')
    .command('objects', 'List objects cufflink can currently read')
    .description('A command tool to help generate seed data based on your object schema in your applications')
    .parse(process.argv);

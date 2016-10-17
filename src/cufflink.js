#!/usr/bin/env node

process.env.FORCE_COLOR = true;

const program = require('commander');
const package = require('../package.json');

program
    .version((package.name) + '@' + (package.version))
    .description('A command tool to help generate seed data based on your object schema in your applications')
    .command('create', 'Generate seed data')
    .command('teardown', 'Destroy your seeded objected with your drivers used')
    .command('drivers', 'List currently created drivers')
    .parse(process.argv);


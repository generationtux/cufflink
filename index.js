#!/usr/bin/env node

const program = require('commander');

program
    .version('0.0.1')
    .command('create', 'Create object')
    .parse(process.argv);

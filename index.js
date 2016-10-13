#!/usr/bin/env node

module.exports = function(number, locale){
    return number.toLocaleString(locale);
};

const program = require('commander');

program
    .version('0.0.1')
    .command('create', 'Create object')
    .parse(process.argv);

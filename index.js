#!/usr/bin/env node
'use strict';

module.exports = function(number, locale){
    return number.toLocaleString(locale);
};

console.log('Hello, world!');

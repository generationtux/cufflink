#!/usr/bin/env node

process.env.FORCE_COLOR = true;

const program = require('commander');
const package = require('../package.json');
const ora = require('ora');
const createApp = require('./cufflink-create')

/**
 * CLI Commands
 *
 */
program
    .version((package.name) + '@' + (package.version));

/**
 * Command for creating and seeding
 *
 */
program
    .command('create [dataObject]', 'Generate seed data').alias('c')
    .description('Create your data seeds')
    .action(function(dataObject){
        if(dataObject === undefined){
            console.log('Please provide an object to seed');
            return;
        }else{
            const spinner = ora('Seeding your object').start();
            var createApp = new createApp();

            createApp.setup(dataObject, function(){
                spinner.success();
            }
        }
    });


program
    .command('teardown', 'Destroy your seeded object with your drivers used').alias('t')




    .command('drivers', 'List drivers cufflink can currently read')

    .command('objects', 'List objects cufflink can currently read')

    .description('A command tool to help generate seed data based on your object schema in your applications')
    .parse(process.argv);

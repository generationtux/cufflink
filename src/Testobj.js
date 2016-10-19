let fs = require('fs');
let objLoc = require('./ObjectLocator');

let obj = new objLoc(fs, "Cart");

console.log(JSON.stringify(obj.run()));
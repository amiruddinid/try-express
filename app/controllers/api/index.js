/**
 * @file contains entry point of controllers api module
 */

 const main = require("./main");
 const v1 = require("./v1");
 const v2 = require("./v2");
 const upload = require('./upload')
 
 module.exports = {
   main,
   v1,
   v2,
   upload
 };
 
'use strict';

const mvt380 = require('./meitrack');

const smsgpsupdateraw = new Buffer('Interval,170718 03:33,A,15,50Km/h,90%,http://maps.google.com/maps?f=q&hl=en&q=14.632930,121.001805&ie=UTF8&z=16&iwloc=addr&om=1');
const gprsgpsupdateraw = new Buffer('$$A138,862170013556541,AAA,35,7.092076,79.960473,140412132808,A,10,9,57,275,1,14,5783799,7403612,413|1|F6E0|3933,0000,000B|0009||02D8|0122,*EE\r\n');


// console.log(mvt380.parseMeitrack(smsgpsupdateraw));
console.log(mvt380.parse(gprsgpsupdateraw));
console.log(mvt380.parseMeitrack(gprsgpsupdateraw));

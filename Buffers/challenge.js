const {Buffer} = require('buffer');
const { log } = require('console');


const buff = Buffer.alloc(3);

buff[0] = 0x48
buff[1] = 0x69
buff[2] = 0x21;

console.log(buff);

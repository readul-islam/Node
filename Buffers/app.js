const { Buffer } = require("buffer");

const memoryContainer = Buffer.alloc(4); // 4 byte and each byte 8 bit = 32 bit

memoryContainer[0] = 0xff;
memoryContainer[1] = 0x3f;
memoryContainer[2] = 0x4f;
memoryContainer[3] = 0x7f;

console.log(memoryContainer);
console.log(memoryContainer[0]);
console.log(memoryContainer[1]);
console.log(memoryContainer[2]);
console.log(memoryContainer[3]);

const buff = Buffer.from([0x48, 0x69, 0x21]);

console.log(buff.toString("utf-8"));



const buff_1 = Buffer.from("486921", 'hex');

console.log(buff_1.toString());


const buff_2 = Buffer.from("Hi!", "utf-8");
console.log(buff_2)